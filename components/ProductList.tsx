import { Category, Product } from '@/sanity.types'
import Categories from './Categories'
import ProductCard from './ProductCard'

interface Props {
	products: Product[],
	title?: boolean
	categories: Category[]
}

const ProductList = ({products, title, categories}: Props) => {
	
	return (
		<div className='pb-32'>
			<Categories categories={categories} />

			<div className='pb-5'>
				<h2 className='text-2xl font-semibold text-gray-600'>Day of the <span className='text-lightBlue'>Deal</span></h2>
				<p className='text-sm text-gray-500'>Don&apos;t wait. The time will never be just right</p>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
				{products?.map((product)=>( 
					<ProductCard key={product?._id} product={product} />
				))}
			</div>
		</div>
	);
}
export default ProductList;