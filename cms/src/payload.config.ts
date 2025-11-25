import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack' // <- NUEVA IMPORTACIÓN
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';

// Importar colecciones
import { Posts } from './collections/Posts';
import { Events } from './collections/Events';
import { Testimonials } from './collections/Testimonials';
import { Media } from './collections/Media';

export default buildConfig({
  admin: {
    user: 'users',
    bundler: webpackBundler(), // <- NUEVA CONFIGURACIÓN PARA RESOLVER EL ERROR
  },
  serverURL: 'http://localhost:1337', // CLAVE: Forzamos la URL base del servidor.
  collections: [
    Posts,
    Events,
    Testimonials,
    Media,
    // Colección de usuarios para administración
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});