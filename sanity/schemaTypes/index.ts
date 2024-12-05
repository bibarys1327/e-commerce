import { type SchemaTypeDefinition } from 'sanity'

import { categoryType } from './categoryType'
import { salesType } from './saleType'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [categoryType, salesType],
}
