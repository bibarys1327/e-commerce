import { Product } from '@/sanity.types'
import { Button } from './ui/button'
import {HiMinus, HiPlus} from 'react-icons/hi2'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

interface Props {
	product: Product
	className?: string
	borderStyle?: string
}

const QuantityButtons = ({product, className, borderStyle}: Props) => {
	const handleRemoveProduct = () => {
		toast.success('Removed clicked')
	}
	const handleAddProduct = () => {
		toast.success('Added clicked')
	}
	const itemsCount = 5
	return (
		<div className={cn('flex items-center gap-1 pb-1 text-base', className)}>
			<Button variant='outline' size='icon' className='w-6 h-6' onClick={handleRemoveProduct}>
				<HiMinus />
			</Button>

			<span className='font-semibold w-8 text-center text-darkBlue'>{itemsCount}</span>

			<Button variant='outline' size='icon' className='w-6 h-6' onClick={handleAddProduct}>
				<HiPlus />
			</Button>
		</div>
	);
}
export default QuantityButtons;