import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import emptyCart from "@/images/emptyCart.png";
import Image from "next/image";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 bg-white py-20">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="inline-block"
      >
        <ShoppingCart size={64} className="mx-auto text-gray-400" />
      </motion.div>
      <Image
        src={emptyCart}
        alt="Empty shopping bag"
        width={200}
        height={200}
        className="mx-auto rounded-lg shadow-md"
      />
      <h2 className="text-3xl font-bold text-gray-800">Your cart is empty!</h2>
      <p>
        Looks like you have&rsquo;t added anything to your cart yet. Explore our
        products and find something you love!
      </p>
      <Link
        href="/"
        className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Start Shopping
      </Link>
    </div>
  );
};
export default EmptyCart;
