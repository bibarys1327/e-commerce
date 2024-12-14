import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";

import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "No Stripe signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.log("Stripe webhook secret is not set");
    return NextResponse.json(
      { error: "Stripe webhook secret is not set" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.log("Webhook event error", error);
    return NextResponse.json(
      { error: `Webhook error ${error}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      const order = await createOrderInSanity(session);
    } catch (error) {
      console.error("Webhook event error", error);
      return NextResponse.json(
        { error: `Order created in Sanity error: ${error}` },
        { status: 400 }
      );
    }
  }
  return NextResponse.json({ received: true });
}

const createOrderInSanity = async (session: Stripe.Checkout.Session) => {
  const {
    id,
    // eslint-disable-next-line camelcase
    amount_total,
    currency,
    metadata,
    // eslint-disable-next-line camelcase
    payment_intent,
    // eslint-disable-next-line camelcase
    total_details,
  } = session;
  const { orderNumber, customerName, customerEmail, clerkUserId } =
    metadata as unknown as Metadata;
  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ["data.price.product"] }
  );
  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item?.quantity || 0,
  }));

  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    // eslint-disable-next-line camelcase
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customerEmail,
    clerkUserId,
    email: customerEmail,
    currency,
    // eslint-disable-next-line camelcase
    amountDiscount: total_details?.amount_discount
      ? // eslint-disable-next-line camelcase
        total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    // eslint-disable-next-line camelcase
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  });
  return order;
};
