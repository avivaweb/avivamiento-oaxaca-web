# Ejecutar Payload CMS

Este workflow inicia el servidor de Payload CMS en modo desarrollo.

## Prerrequisitos

1. Asegúrate de tener las dependencias instaladas:
   ```bash
   cd cms && npm install
   ```

2. Configura las variables de entorno creando `cms/.env`:
   ```bash
   cp cms/.env.example cms/.env
   ```
   
   Luego edita `cms/.env` con tus credenciales de PostgreSQL/Supabase.

## Comando

```bash
cd cms && npm run dev
```

## Acceso

Una vez iniciado, el CMS estará disponible en:
- **Admin Panel**: http://localhost:3001/admin
- **API**: http://localhost:3001/api
- **GraphQL**: http://localhost:3001/api/graphql

## Primera Vez

En tu primera ejecución, necesitarás crear un usuario administrador:
1. Navega a http://localhost:3001/admin
2. Completa el formulario de registro
3. Este será tu usuario administrador principal

## Colecciones Disponibles

- **Posts**: Blog y mensajes
- **Events**: Eventos de la iglesia
- **Testimonials**: Testimonios de miembros
- **Media**: Gestión de imágenes y archivos
- **Users**: Usuarios administradores

## Notas

- El CMS usa el puerto 3001 para no conflictuar con:
  - Frontend (web): puerto 3000
  - Backend API: puerto 3002
- Los archivos subidos se guardan en `cms/media/`
- La base de datos debe estar configurada en `DATABASE_URI`