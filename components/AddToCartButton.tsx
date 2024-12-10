'use client';

import { Product } from '@/sanity.types'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { Divide } from 'lucide-react'
import QuantityButtons from './QuantityButtons'
import PriceFormatter from './PriceFormatter'

interface Props {
	product: Product;
	className?: string 
}

const AddToCartButton = ({product, className} : Props) => {
	const handleAddToCart = () => {
	 toast.success('Cart dispatched successfully')
	}
	const itemsCount = 5
	return (
		<div>
			{itemsCount ? (
				<div className='text-sm'>
					<div className='flex items-center justify-between'>
						<span className='text-xs text-muted-foreground'>Quantity</span>
						<QuantityButtons product={product} />
					</div>
					<div className='flex items-center justify-between border-t pt-1'>
						<span>SubTotal</span>
						<PriceFormatter amount={product?.price ? product?.price * itemsCount : 0} />
					</div>
				</div>
			) : (
				<Button onClick={handleAddToCart} className={cn('bg-darkBlue/10 text-black border-darkBlue border py-2 mt-2 w-full rounded-md font-medium hover:bg-darkBlue hover:text-white hoverEffect disabled:hover:cursor-not-allowed disabled:bg-darkBlue/10 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:border-darkBlue/100', className)}>
			Add to cart
		</Button>
			)}
		</div>
	);
}
export default AddToCartButton;