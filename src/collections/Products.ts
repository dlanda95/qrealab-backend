import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Producto', plural: 'Productos' },
  orderable: true,
  defaultSort: '_order',
  admin: {
    group: 'Catálogo',
    useAsTitle: 'name',
    defaultColumns: ['_order', 'name', 'category', 'status', 'updatedAt'],
    listSearchableFields: ['name', 'activeIngredient'],
  },
  access: { read: () => true },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre del producto',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      validate: (val: unknown) => {
        if (typeof val !== 'string' || val.trim() === '') return 'El slug es obligatorio.'
        if (!/^[a-z0-9-]+$/.test(val)) return 'El slug solo puede contener letras minúsculas, números y guiones (-).'
        return true
      },
      admin: { description: 'Ej: cardiotrex-10mg (sin espacios, en minúsculas)' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      label: 'Categoría',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline (frase corta)',
      localized: true,
      admin: { description: 'Frase breve que aparece en la tarjeta. Máx. 80 caracteres.' },
    },
    {
      name: 'activeIngredient',
      type: 'text',
      label: 'Principio activo',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción del producto',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen principal',
    },
    {
      name: 'inserto',
      type: 'upload',
      relationTo: 'documents',
      label: { es: 'Inserto / Ficha técnica', en: 'Insert / Technical sheet' },
      admin: {
        description: {
          es: 'PDF, Word o PowerPoint. Máx. 5 MB. Aparece como botón de descarga en el detalle del producto. Dejar vacío si el producto no tiene inserto.',
          en: 'PDF, Word, or PowerPoint. Max 5 MB. Shown as a download button on the product detail page. Leave empty if the product has no insert.',
        },
      },
    },
    {
      name: 'presentations',
      type: 'array',
      label: 'Presentaciones',
      minRows: 0,
      maxRows: 10,
      admin: { description: 'Ej: Tabletas 10mg × 20, Jarabe 120 mL' },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Presentación',
          required: true,
          localized: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Producto destacado',
          defaultValue: false,
        },
        {
          name: 'status',
          type: 'select',
          label: 'Estado',
          defaultValue: 'active',
          options: [
            { label: 'Activo', value: 'active' },
            { label: 'Inactivo', value: 'inactive' },
          ],
        },
      ],
    },
  ],
}
