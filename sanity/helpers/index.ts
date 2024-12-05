import { sanityFetch } from '../lib/live'
import { SALE_QUERY } from './queries'

export const getSale = async () => {
	try {
		const products = await sanityFetch({
			query: SALE_QUERY,
		})
		return products?.data || []
	} catch (error) {
		console.error('Error fetching Sale data:', error)
		return []
	}
}
