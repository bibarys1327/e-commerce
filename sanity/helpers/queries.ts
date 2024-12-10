import { defineQuery } from 'next-sanity'

export const SALE_QUERY = defineQuery(`*[_type == 'sale'] | order(name asc)`)

export const PRODUCTS_QUERY = defineQuery(`*[_type == 'product'] | order(name asc)`)

export const 	CATEGORIES_QUERY = defineQuery(`*[_type == 'category'] | order(name asc)`)