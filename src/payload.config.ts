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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
serverURL: 'http://localhost:3000', // Agrégalo explícitamente aquí
  cors: ['http://localhost:3000','http://localhost:4200'],
  csrf: ['http://localhost:3000','http://localhost:4200'],

  collections: [Users, Media, HeroSlides, History, WhoWeAre, OurValues, Footer],
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
  plugins: [],
})
