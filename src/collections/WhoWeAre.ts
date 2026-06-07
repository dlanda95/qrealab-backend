import type { CollectionConfig } from 'payload'

export const WhoWeAre: CollectionConfig = {
  slug: 'whoweare',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', label: 'Título', required: true, localized: true },
    {
      name: 'description',
      type: 'textarea', // Usamos textarea para que tú controles los estilos en Angular
      label: 'Descripción (puedes separar párrafos con saltos de línea)',
      required: true,
      localized: true,
    },
    { 
      name: 'image', 
      type: 'upload', 
      relationTo: 'media', 
      label: 'Imagen' 
    },
  ],
}