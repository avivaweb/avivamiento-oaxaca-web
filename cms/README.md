# Payload CMS - AVIVA

Sistema de gestión de contenido para el sitio web público de AVIVA.

## Instalación

```bash
npm install
```

## Configuración

1. Copia el archivo de ejemplo de variables de entorno:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` con tus credenciales:
   ```env
   DATABASE_URI=postgresql://user:password@host:port/database
   PAYLOAD_SECRET=tu-secret-key-muy-segura
   SERVER_URL=http://localhost:3001
   PORT=3001
   ```

## Desarrollo

```bash
npm run dev
```

El servidor se iniciará en http://localhost:3001

## Producción

```bash
npm run build
npm run serve
```

## Estructura

```
cms/
├── src/
│   ├── collections/      # Definiciones de colecciones
│   │   ├── Posts.ts      # Blog y mensajes
│   │   ├── Events.ts     # Eventos
│   │   ├── Testimonials.ts # Testimonios
│   │   └── Media.ts      # Archivos multimedia
│   ├── payload.config.ts # Configuración principal
│   └── server.ts         # Servidor Express
├── media/                # Archivos subidos (gitignored)
├── dist/                 # Build de producción (gitignored)
└── package.json
```

## Colecciones

### Posts
Contenido de blog y mensajes con:
- Título, slug, contenido rico
- Categoría (blog/mensaje)
- Autor, imagen destacada
- Etiquetas, fecha de publicación
- Estados: borrador/publicado

### Events
Eventos de la iglesia con:
- Nombre, descripción, fechas
- Ubicación, dirección
- Link de registro, capacidad
- Estados: próximo/en curso/finalizado/cancelado

### Testimonials
Testimonios de miembros con:
- Testimonio, autor, rol
- Foto del autor
- Categorías temáticas
- Opción de destacado
- Estados: pendiente/aprobado/rechazado

### Media
Gestión de archivos multimedia:
- Imágenes
- Texto alternativo para accesibilidad
- Usado por otras colecciones

## API

Payload genera automáticamente:
- REST API en `/api/{collection}`
- GraphQL API en `/api/graphql`
- Admin UI en `/admin`

## Integración con Frontend

El frontend Next.js puede consumir el contenido mediante:
1. REST API: `fetch('http://localhost:3001/api/posts')`
2. GraphQL: Queries personalizados
3. SDK de Payload (opcional)

## Seguridad

- Autenticación requerida para admin panel
- Lectura pública habilitada para colecciones
- Secret key para JWT en `PAYLOAD_SECRET`
- Conexión segura a PostgreSQL

## Soporte

Para más información sobre Payload CMS:
- Documentación: https://payloadcms.com/docs
- GitHub: https://github.com/payloadcms/payload