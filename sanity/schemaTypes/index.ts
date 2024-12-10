import { type SchemaTypeDefinition } from 'sanity'

import { categoryType } from './categoryType'
import { salesType } from './saleType'
import { productType } from './productType'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [categoryType, salesType, productType],
}
