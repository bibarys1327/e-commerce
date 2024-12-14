/* eslint-disable camelcase */
import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import PriceFormatter from "./PriceFormatter";
import React from "react";

interface Props {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDialog: React.FC<Props> = ({ order, isOpen, onClose }) => {
  if (!order) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            <strong>Customer:</strong> {order?.cutomerName}
          </p>
          <p>
            <strong>Email:</strong> {order?.email}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {order?.orderDate &&
              new Date(order?.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {order?.status}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.products?.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2">
                  {product?.product?.image && (
                    <Link href={`/product/${product?.product?.slug?.current}`}>
                      <Image
                        src={urlFor(product?.product?.image).url()}
                        alt="productImage"
                        width={50}
                        height={50}
                        className="hoverEffect rounded-md border hover:scale-105"
                      />
                    </Link>
                  )}
                  {product?.product && product?.product?.name}
                </TableCell>
                <TableCell>{product?.quantity}</TableCell>
                <TableCell>
                  <PriceFormatter
                    amount={product?.product?.image}
                    className="font-medium text-black"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right">
          <strong>Total:</strong>
          <PriceFormatter
            amount={order?.totalPrice}
            className="font-bold text-black"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default OrderDetailsDialog;
