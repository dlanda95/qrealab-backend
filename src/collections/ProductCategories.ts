import type { CollectionConfig } from 'payload'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: { singular: 'Categoría', plural: 'Categorías' },
  orderable: true,
  defaultSort: '_order',
  admin: {
    group: 'Catálogo',
    useAsTitle: 'name',
    defaultColumns: ['_order', 'name', 'slug', 'updatedAt'],
  },
  access: { read: () => true },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre de categoría',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      admin: { description: 'Ej: cardiovascular, respiratorio, dolor' },
    },
  ],
}
