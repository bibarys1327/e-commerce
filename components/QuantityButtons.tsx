import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { HiMinus, HiPlus } from "react-icons/hi2";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import userCartStore from "@/store";

interface Props {
  product: Product;
  className?: string;
  borderStyle?: string;
}

const QuantityButtons = ({ product, className, borderStyle }: Props) => {
  const { addItem, removeItem, getItemCount } = userCartStore();
  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemsCount > 1) {
      toast.success("Quantity Decreased successfully");
    } else {
      toast.success(
        `${product?.name?.substring(0, 12)}... removed successfully`
      );
    }
  };
  const handleAddProduct = () => {
    addItem(product);
    toast.success("Quantity increased successfully");
  };
  const itemsCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  return (
    <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
      <Button
        variant="outline"
        size="icon"
        className="size-6"
        onClick={handleRemoveProduct}
      >
        <HiMinus />
      </Button>

      <span className="w-8 text-center font-semibold text-darkBlue">
        {itemsCount}
      </span>

      <Button
        variant="outline"
        size="icon"
        className="size-6"
        onClick={handleAddProduct}
      >
        <HiPlus />
      </Button>
    </div>
  );
};
export default QuantityButtons;
