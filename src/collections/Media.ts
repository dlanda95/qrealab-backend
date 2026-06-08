import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Archivo', plural: 'Medios / Archivos' },
  admin: { group: 'Medios' },
  access: {
    // Es CRÍTICO que sea público para que Angular pueda descargar la foto
    read: () => true, 
  },
  upload: {
    disableLocalStorage: true, // archivos van a Cloudflare R2, no al disco local
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texto alternativo (Para SEO y accesibilidad)',
    },
  ],
}