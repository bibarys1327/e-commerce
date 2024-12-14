"use client";

import userCartStore from "@/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Home, ListOrderedIcon, ShoppingBag } from "lucide-react";
import Link from "next/link";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearCart = userCartStore((state) => state.resetCart);
  useEffect(() => {
    if (orderNumber) {
      clearCart();
    }
  }, [orderNumber, clearCart]);

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4 py-10 md:py-20 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl rounded-2xl bg-white p-8 text-center shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-8 flex size-24 items-center justify-center rounded-full bg-green-100 shadow-lg"
        >
          <Check className="size-12 text-teal-600" />
        </motion.div>
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Order Confirmed!
        </h1>
        <div className="mb-8 space-y-4 text-left text-gray-600">
          <p>
            Thank you for your purchase. We&apos;re processing your order and
            will ship it soon. A confirmation email with your order details will
            be sent to your inbox shortly.
          </p>
          <p>
            Order Number:{" "}
            <span className="font-semibold text-black">{orderNumber}</span>
          </p>
        </div>
        <div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-4">
          <h2 className="mb-2 font-semibold text-green-700">
            What&rsquo;s Next?
          </h2>
          <ul className="space-y-1 text-sm text-green-700">
            <li>Check your email for order confirmation</li>
            <li>We&rsquo;ll notify you when your order ships</li>
            <li>Track your order status anytime</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href={"/"}
            className="hoverEffect flex items-center justify-center rounded-lg bg-green-500 px-4 py-3 font-semibold text-white shadow-md hover:bg-green-600"
          >
            <Home className="mr-2 size-5" />
            Home
          </Link>
          <Link
            href={"/orders"}
            className="hoverEffect flex items-center justify-center rounded-lg bg-green-500 px-4 py-3 font-semibold text-white shadow-md hover:bg-green-600"
          >
            <ListOrderedIcon className="mr-2 size-5" />
            Orders
          </Link>
          <Link
            href={"/"}
            className="hoverEffect flex items-center justify-center rounded-lg bg-green-500 px-4 py-3 font-semibold text-white shadow-md hover:bg-green-600"
          >
            <ShoppingBag className="mr-2 size-5" />
            Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
export default SuccessPage;
