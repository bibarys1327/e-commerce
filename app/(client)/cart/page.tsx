"use client";

import Container from "@/components/Container";
import Loader from "@/components/Loader";
import NoAccessToCart from "@/components/NoAccessToCart";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/sanity/lib/image";
import userCartStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { Divide, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = userCartStore();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const groupedItems = userCartStore((state) => state.getGroupedItems());
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loader />;
  }

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
  };

  const handleCheckout = async () => {
    toast.success("Checkout will apply soon");
  };
  return (
    <div className="bg-gray-50 pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="size-6 text-primary" />
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              </div>
              <div className="grid md:gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <div className="hidden w-full rounded-lg border bg-white p-6 md:inline-block">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span>Total</span>
                        <PriceFormatter amount={getTotalPrice()} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button onClick={handleCheckout}>
                          Proceed to Checkout
                        </Button>
                        <Link
                          href={"/"}
                          className="hoverEffect text-center text-sm text-primary hover:text-darkBlue hover:underline"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-5 rounded-t-lg border bg-white p-2.5 text-base font-semibold md:grid-cols-6">
                    <h2 className="col-span-2 md:col-span-3">Product</h2>
                    <h2>Price</h2>
                    <h2>Quantity</h2>
                    <h2>Total</h2>
                  </div>
                  <div className="rounded-b-lg border  border-t-0 bg-white">
                    {groupedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="grid grid-cols-5 border-b p-2.5 last:border-b-0 md:grid-cols-6"
                        >
                          <div className="col-span-2 flex items-center md:col-span-3">
                            <Trash2
                              onClick={() => {
                                handleDeleteProduct(product?._id);
                              }}
                              className="hoverEffect mr-1 size-4 text-gray-500 hover:text-red-600 md:size-5"
                            />
                            {product?.image && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="group mr-2 overflow-hidden rounded-md border p-0.5 md:p-1"
                              >
                                <Image
                                  src={urlFor(product?.image).url()}
                                  alt="productImage"
                                  width={300}
                                  height={300}
                                  className="hoverEffect size-10 overflow-hidden object-cover group-hover:scale-105 md:h-14 md:w-full"
                                />
                              </Link>
                            )}
                            <h2 className="text-sm">{product?.name}</h2>
                          </div>
                          <div className="flex items-center">
                            <PriceFormatter
                              amount={
                                product?.price ? product?.price * itemCount : 0
                              }
                            />
                          </div>
                          <QuantityButtons
                            product={product}
                            className="gap-0 text-sm md:gap-1"
                          />
                          <div>
                            <PriceFormatter
                              amount={
                                product?.price ? product?.price * itemCount : 0
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>Empty cart</div>
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};
export default CartPage;
