import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario', plural: 'Usuarios' },
  admin: {
    group: 'Administración',
    useAsTitle: 'email',
  },
  auth: {
    lockTime:         10 * 60 * 1000,   // bloqueo de 10 min tras intentos fallidos
    maxLoginAttempts: 5,                 // 5 intentos antes de bloquear
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
