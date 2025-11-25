# Plan de Validación de Despliegue en Staging - AVIVA

## Objetivo

Este documento establece un plan de acción completo para validar el despliegue de prueba en el entorno de staging, asegurando que todos los servicios microservicios funcionen correctamente antes de promover a producción.

## Variables Críticas de Entorno

### Frontend (Vercel - web/)
Configurar las siguientes variables públicas en Vercel Environment Variables:

- `NEXT_PUBLIC_API_URL`: `https://aviva-api-staging.onrender.com`
  - Propósito: URL del Core System API (NestJS) para autenticación y gestión celular
- `NEXT_PUBLIC_CMS_URL`: `https://aviva-cms-staging.onrender.com`
  - Propósito: URL del CMS (Payload) para contenido público
- `NEXT_PUBLIC_AI_URL`: `https://aviva-ai-staging.onrender.com`
  - Propósito: URL del Motor de IA para automatización de contenido

### Backend API (Render - api/)
Configurar las siguientes variables en Render Environment:

- `DATABASE_URL`: `postgresql://postgres:[PASSWORD_STAGING]@[HOST_STAGING]:5432/postgres?sslmode=require`
  - Propósito: Conexión a base de datos PostgreSQL de Supabase staging
- `PORT`: `3002`
- `NODE_ENV`: `staging`

### Secrets Requeridos en GitHub Actions
- `VERCEL_TOKEN`: Token de autenticación de Vercel
- `VERCEL_ORG_ID`: ID de organización en Vercel
- `VERCEL_PROJECT_ID`: ID del proyecto en Vercel
- `RENDER_API_DEPLOY_HOOK`: Webhook para despliegue automático de API
- `RENDER_CMS_DEPLOY_HOOK`: Webhook para despliegue automático de CMS
- `RENDER_AI_DEPLOY_HOOK`: Webhook para despliegue automático de AI Service

## Checklist de Validación Remota

### 1. Prueba de Conectividad Frontend → Core API Externa
- [ ] Acceder a `https://aviva-staging.vercel.app`
- [ ] Intentar login/registro desde el frontend
- [ ] Verificar que las llamadas API no fallen (Network tab en DevTools)
- [ ] Confirmar que las respuestas de la API llegan correctamente
- [ ] Validar que no hay errores de CORS en consola

### 2. Prueba de Conectividad Core API → DATABASE_URL Staging
- [ ] Ejecutar health check: `curl https://aviva-api-staging.onrender.com/health`
- [ ] Verificar logs en Render para confirmar conexión a DB
- [ ] Intentar una operación de escritura/lectura simple (ej: crear subscriber)
- [ ] Confirmar que no hay errores de conexión en logs
- [ ] Validar que las migraciones de Prisma se aplicaron correctamente

### 3. Prueba de Inserción E2E Remota
- [ ] Desde el frontend staging, completar un flujo completo:
  - Registro de usuario
  - Creación de célula
  - Publicación de contenido en CMS
  - Consulta de datos desde diferentes servicios
- [ ] Verificar integridad de datos entre servicios
- [ ] Confirmar que todas las APIs responden correctamente
- [ ] Validar que los webhooks entre servicios funcionan (si aplican)

## Posibles Causas de Fallo y Soluciones

### Mixed Content (HTTP/HTTPS)
**Síntoma:** Errores de "Mixed Content" en consola del navegador.
**Causa:** URLs de API configuradas con HTTP en lugar de HTTPS.
**Solución:**
- Verificar que todas las `NEXT_PUBLIC_*_URL` usen `https://`
- Actualizar variables de entorno en Vercel
- Redeploy del frontend

### CORS (Cross-Origin Resource Sharing)
**Síntoma:** Errores de CORS al hacer requests desde el frontend.
**Causa:** Backend no permite orígenes del dominio de staging.
**Solución:**
- Configurar CORS en NestJS API para permitir `https://aviva-staging.vercel.app`
- Verificar configuración en Payload CMS
- Redeploy de servicios backend

### Falta de Secrets/Variables de Entorno
**Síntoma:** Servicios no inician o fallan al conectarse a dependencias.
**Causa:** Variables no configuradas en hosting providers.
**Solución:**
- Verificar todas las variables listadas arriba en Vercel/Render
- Confirmar que los secrets de GitHub Actions están correctos
- Revisar logs de despliegue para errores específicos

### Conexión a Base de Datos
**Síntoma:** API responde pero operaciones de DB fallan.
**Causa:** DATABASE_URL incorrecta o credenciales expiradas.
**Solución:**
- Verificar credenciales de Supabase staging
- Confirmar que la DB está activa y accesible
- Revisar logs de Prisma para errores de conexión

### Timeouts de Servicios
**Síntoma:** Requests tardan mucho o fallan por timeout.
**Causa:** Servicios externos lentos o configuración de timeout baja.
**Solución:**
- Aumentar timeouts en Render (especialmente para AI Service)
- Optimizar queries de DB
- Verificar rendimiento de servicios externos

## Procedimiento de Validación

1. **Pre-Despliegue:**
   - Confirmar que todos los secrets están configurados
   - Verificar que las ramas están actualizadas

2. **Durante Despliegue:**
   - Monitorear logs de GitHub Actions
   - Verificar health checks automáticos

3. **Post-Despliegue:**
   - Ejecutar checklist de validación manual
   - Probar flujos críticos de usuario
   - Revisar logs de todos los servicios

4. **Rollback si es necesario:**
   - Usar versiones anteriores en Vercel/Render
   - Corregir issues identificados
   - Re-desplegar

## Herramientas de Monitoreo

- **Vercel Dashboard:** Logs de funciones y deployments
- **Render Dashboard:** Logs de servicios y métricas
- **Supabase Dashboard:** Queries y estado de DB
- **Browser DevTools:** Network tab para debugging de requests

## Contactos de Soporte

- **Desarrollo:** Equipo de desarrollo AVIVA
- **Infraestructura:** Administradores de Vercel/Render/Supabase
- **Monitoreo:** Logs y dashboards de cada servicio

---

*Última actualización: Octubre 2024*