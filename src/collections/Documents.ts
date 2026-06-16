import type { CollectionConfig, CollectionBeforeOperationHook } from 'payload'

const MAX_DOC_SIZE = 5 * 1024 * 1024 // 5 MB

const enforceDocSize: CollectionBeforeOperationHook = ({ args, operation }) => {
  if (operation === 'create') {
    const file = args.req?.file
    if (file && file.size > MAX_DOC_SIZE) {
      throw new Error('El archivo supera el límite de 5 MB.')
    }
  }
  return args
}

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: { singular: 'Documento', plural: 'Documentos' },
  admin: {
    group: 'Medios',
    useAsTitle: 'title',
    description: 'Insertas, fichas técnicas y otros documentos descargables.',
  },
  access: { read: () => true },
  hooks: {
    beforeOperation: [enforceDocSize],
  },
  upload: {
    disableLocalStorage: true,
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nombre del documento',
      admin: { description: 'Ej: Inserto Qreinflora — se usa solo en el panel de administración.' },
    },
  ],
}
