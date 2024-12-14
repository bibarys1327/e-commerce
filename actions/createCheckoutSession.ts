"use server";
import stripe from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

// export async function createCheckoutSession(
//   items: GroupedCartItems[],
//   metadata: Metadata
// ) {
//   try {
//     const itemsWithoutPrice = items.filter((item) => !item.product.price);
//     if (itemsWithoutPrice.length > 0) {
//       throw new Error("Some items do not have a price");
//     }
//     const customers = await stripe.customers.list({
//       email: metadata.customerEmail,
//       limit: 1,
//     });
//     const customerId = customers.data.length > 0 ? customers.data[0] : "";
//     const sessionPayload: Stripe.Checkout.SessionCreateParams = {
//       metadata: {
//         orderNumber: metadata.orderNumber,
//         customerName: metadata.customerName,
//         customerEmail: metadata.customerEmail,
//         clerkUserId: metadata.clerkUserId,
//       },
//       mode: "payment",
//       allow_promotion_codes: true,
//       payment_method_types: ["card"],
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?.session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
//       line_items: items.map((item) => ({
//         price_data: {
//           currency: "USD",
//           unit_amount: Math.round(item.product.price! * 100),
//           product_data: {
//             name: item.product.name || "Unnamed Product",
//             description: item.product.description,
//             metadata: { id: item.product._id },
//             images: item.product.image
//               ? [urlFor(item.product.image).url]
//               : undefined,
//           },
//         },
//         quantity: item.quantity,
//       })),
//     };
//     if (customerId) {
//       sessionPayload.customer = customerId;
//     } else {
//       sessionPayload.customer_email = metadata.customerEmail;
//     }
//     const session = await stripe.checkout.sessions.create(sessionPayload);
//     return session.url;
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     throw error;
//   }
// }

export async function createCheckoutSession(
  items: GroupedCartItems[],
  metadata: Metadata
) {
  try {
    // Filter items that don't have a price
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    // Find the customer based on email
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    const customerId = customers.data.length > 0 ? customers.data[0].id : "";

    // Prepare the session payload
    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "USD",
          unit_amount: Math.round(item.product.price! * 100), // Convert price to cents
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: item.product.description,
            metadata: { id: item.product._id },
            images:
              item.product.image || undefined
                ? [urlFor(item.product.image!).url] // Ensure this returns a valid string URL
                : undefined, // If no image, set as undefined
          },
        },
        quantity: item.quantity,
      })),
    };

    // Assign the customer if found, otherwise use email
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionPayload);

    // Return the session URL
    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}