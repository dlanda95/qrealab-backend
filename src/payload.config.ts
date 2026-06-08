import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { HeroSlides } from './collections/HeroSlides'
import { History } from './collections/History'
import { WhoWeAre } from './collections/WhoWeAre'
import { OurValues } from './collections/OurValues'
import { Footer }    from './collections/Footer'
import { ProductCategories } from './collections/ProductCategories'
import { Products }           from './collections/Products'
import { Vigilance }          from './collections/Vigilance'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { ContactSettings }    from './globals/ContactSettings'
import { AboutSettings }      from './globals/AboutSettings'
import { NavSettings }        from './globals/NavSettings'
import { HomeSettings }       from './globals/HomeSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ── Orígenes permitidos ───────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:4200',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.PAYLOAD_PUBLIC_SERVER_URL,
].filter((url): url is string => Boolean(url))

// ── Plugins — Cloudinary (solo producción) ────────────────────────────────────
// Al desplegar en Railway:
//   1. Ejecutar: pnpm add @payloadcms/storage-cloudinary@3.84.1
//   2. Descomentar el bloque de abajo
//   3. Configurar las variables CLOUDINARY_* en Railway

// import { cloudinaryStorage } from '@payloadcms/storage-cloudinary'
// const cloudinaryPlugin = cloudinaryStorage({
//   config: {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
//     api_key:    process.env.CLOUDINARY_API_KEY    || '',
//     api_secret: process.env.CLOUDINARY_API_SECRET || '',
//   },
//   collections: { media: true },
//   disableLocalStorage: true,
// })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  cors: allowedOrigins,
  csrf: allowedOrigins,

  localization: {
    locales: [
      { label: 'Español', code: 'es' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'es',
    fallback: true,
  },

  collections: [Users, Media, HeroSlides, History, WhoWeAre, OurValues, Footer, ProductCategories, Products, Vigilance, ContactSubmissions],
  globals: [HomeSettings, NavSettings, ContactSettings, AboutSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  sharp,

  // Para activar Cloudinary en producción: ver bloque comentado arriba
  plugins: [],
})
