import { Category } from '@/sanity.types'
import CatergorySelector from './CatergorySelector'

const Categories = ({categories}: {categories: Category[]}) => {
	
	return (
		<div className='py-5'>
			<CatergorySelector categories={categories} />
		</div>
	);
}
export default Categories;