import type { CollectionConfig } from 'payload'

export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  admin: {
    useAsTitle: 'tag', // En la lista del panel, mostrará la Etiqueta como título
  },
  access: {
    read: () => true, // Angular necesita leer esto sin iniciar sesión
  },
  fields: [
    {
      name: 'tag',
      type: 'text',
      label: 'Etiqueta (Ej: INNOVACIÓN FARMACÉUTICA)',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título Principal (Permite etiquetas HTML como <span class="text-green">)',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtítulo',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', // Lo conecta con la colección Media que creamos arriba
      label: 'Imagen de Fondo',
      required: true,
    },
    {
      type: 'row', // Agrupa estos dos campos visualmente en la misma línea
      fields: [
        {
          name: 'ctaText',
          type: 'text',
          label: 'Texto del Botón',
        },
        {
          name: 'ctaLink',
          type: 'text',
          label: 'Enlace del Botón (Ej: /about)',
        }
      ]
    }
  ],
}