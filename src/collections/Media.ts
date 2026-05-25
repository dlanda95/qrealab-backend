import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    // Es CRÍTICO que sea público para que Angular pueda descargar la foto
    read: () => true, 
  },
  upload: true, // Esto le dice a Payload que esta colección es para subir archivos
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texto alternativo (Para SEO y accesibilidad)',
    },
  ],
}