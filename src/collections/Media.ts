import type { CollectionConfig, CollectionBeforeOperationHook } from 'payload'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

const enforceFileSize: CollectionBeforeOperationHook = ({ args, operation }) => {
  if (operation === 'create') {
    const file = args.req?.file
    if (file && file.size > MAX_FILE_SIZE) {
      throw new Error('El archivo supera el límite de 10 MB.')
    }
  }
  return args
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Archivo', plural: 'Medios / Archivos' },
  admin: { group: 'Medios' },
  access: {
    // Público para que Angular pueda descargar imágenes directamente
    read: () => true,
  },
  hooks: {
    beforeOperation: [enforceFileSize],
  },
  upload: {
    disableLocalStorage: true, // archivos van a Cloudflare R2, no al disco local
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/gif',
      'image/svg+xml',
    ],
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
