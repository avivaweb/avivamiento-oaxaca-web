# Guía de Despliegue - AVIVA

## Arquitectura de Despliegue

```
┌─────────────────────────────────────────────────────────────┐
│                    STAGING ENVIRONMENT                       │
└─────────────────────────────────────────────────────────────┘

Frontend (Vercel)
├── aviva-staging.vercel.app
└── Variables: API_URL, CMS_URL, AI_URL

Backend Services (Render.com)
├── aviva-api-staging.onrender.com (NestJS)
├── aviva-cms-staging.onrender.com (Payload)
└── aviva-ai-staging.onrender.com (Express)

Database
└── Supabase PostgreSQL
```

## Configuración de Secrets en GitHub

Agregar los siguientes secrets en GitHub (Settings → Secrets and variables → Actions):

### Vercel
- `VERCEL_TOKEN`: Token de Vercel
- `VERCEL_ORG_ID`: ID de organización
- `VERCEL_PROJECT_ID`: ID del proyecto

### Render
- `RENDER_API_DEPLOY_HOOK`: Webhook para API
- `RENDER_CMS_DEPLOY_HOOK`: Webhook para CMS
- `RENDER_AI_DEPLOY_HOOK`: Webhook para AI Service

### URLs de Staging
- `STAGING_API_URL`: https://aviva-api-staging.onrender.com
- `STAGING_CMS_URL`: https://aviva-cms-staging.onrender.com
- `STAGING_AI_URL`: https://aviva-ai-staging.onrender.com

## Proceso de Despliegue

1. **Push a rama `develop`**
2. **GitHub Actions se activa automáticamente**
3. **Despliegue paralelo de servicios**:
   - Frontend → Vercel
   - API → Render
   - CMS → Render
   - AI Service → Render
4. **Health checks automáticos**
5. **Notificación de éxito/fallo**

## Comandos Manuales

### Desplegar Frontend
```bash
cd web
vercel --prod
```

### Desplegar API
```bash
cd api
git push render develop
```

### Desplegar CMS
```bash
cd cms
git push render develop
```

### Desplegar AI Service
```bash
cd ai-service
git push render develop
```

## Verificación Post-Despliegue

```bash
# Health checks
curl https://aviva-api-staging.onrender.com/health
curl https://aviva-cms-staging.onrender.com/health
curl https://aviva-ai-staging.onrender.com/health
curl https://aviva-staging.vercel.app
```

## Troubleshooting

### Frontend no se conecta al Backend
1. Verificar variables de entorno en Vercel
2. Confirmar URLs de staging
3. Revisar CORS en backends

### Backend no inicia
1. Revisar logs en Render
2. Verificar variables de entorno
3. Confirmar conexión a base de datos

### AI Service timeout
1. Aumentar timeout en Render
2. Verificar API keys de servicios externos
3. Revisar logs de procesamiento

## Configuración Inicial

### 1. Configurar Vercel

1. Crear cuenta en [Vercel](https://vercel.com)
2. Conectar repositorio de GitHub
3. Configurar proyecto:
   - Framework: Next.js
   - Root Directory: `web`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Agregar variables de entorno:
   ```
   NEXT_PUBLIC_API_URL=https://aviva-api-staging.onrender.com
   NEXT_PUBLIC_CMS_URL=https://aviva-cms-staging.onrender.com
   NEXT_PUBLIC_AI_URL=https://aviva-ai-staging.onrender.com
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
5. Obtener tokens para GitHub Actions:
   - Settings → Tokens → Create Token
   - Copiar: Token, Org ID, Project ID

### 2. Configurar Render

#### Para cada servicio (API, CMS, AI):

1. Crear cuenta en [Render](https://render.com)
2. New → Web Service
3. Conectar repositorio de GitHub
4. Configurar servicio:
   - **API**:
     - Name: `aviva-api-staging`
     - Root Directory: `api`
     - Build Command: `npm install && npm run build`
     - Start Command: `npm run start:prod`
   - **CMS**:
     - Name: `aviva-cms-staging`
     - Root Directory: `cms`
     - Build Command: `npm install && npm run build`
     - Start Command: `npm run serve`
   - **AI Service**:
     - Name: `aviva-ai-staging`
     - Root Directory: `ai-service`
     - Build Command: `npm install && npm run build`
     - Start Command: `npm run start`
5. Agregar variables de entorno según `render.yaml`
6. Obtener Deploy Hook:
   - Settings → Deploy Hook
   - Copiar URL del webhook

### 3. Configurar GitHub Secrets

1. Ir a repositorio → Settings → Secrets and variables → Actions
2. Agregar todos los secrets listados arriba
3. Verificar que los nombres coincidan exactamente

### 4. Configurar Supabase

1. Crear proyecto en [Supabase](https://supabase.com)
2. Obtener credenciales:
   - Project URL
   - Anon/Public Key
3. Configurar tablas según schema de Prisma
4. Agregar credenciales a:
   - Variables de entorno de Vercel
   - Variables de entorno de Render (API)
   - Archivos `.env.local` y `.env.staging`

## Flujo de Trabajo de Desarrollo

### Desarrollo Local
```bash
# Terminal 1: API
cd api
npm run start:dev

# Terminal 2: CMS
cd cms
npm run dev

# Terminal 3: AI Service
cd ai-service
npm run dev

# Terminal 4: Frontend
cd web
npm run dev
```

### Despliegue a Staging
```bash
# Hacer cambios en rama develop
git checkout develop
git add .
git commit -m "feat: nueva funcionalidad"
git push origin develop

# GitHub Actions desplegará automáticamente
```

### Promoción a Producción
```bash
# Merge develop a main
git checkout main
git merge develop
git push origin main

# Configurar workflow similar para producción
```

## Monitoreo

### Logs en Render
1. Dashboard → Service → Logs
2. Filtrar por nivel (Error, Warning, Info)
3. Descargar logs si es necesario

### Logs en Vercel
1. Dashboard → Project → Deployments
2. Click en deployment → View Function Logs
3. Filtrar por función o tiempo

### Métricas
- **Render**: Dashboard → Service → Metrics
- **Vercel**: Dashboard → Project → Analytics

## Rollback

### Vercel
1. Dashboard → Project → Deployments
2. Click en deployment anterior
3. Promote to Production

### Render
1. Dashboard → Service → Deploys
2. Click en deploy anterior
3. Redeploy

## Costos Estimados

### Staging (Plan Gratuito)
- **Vercel**: Gratis (Hobby Plan)
- **Render**: Gratis (Free Plan) - 3 servicios
- **Supabase**: Gratis (Free Tier)
- **Total**: $0/mes

### Producción (Recomendado)
- **Vercel**: $20/mes (Pro Plan)
- **Render**: $21/mes (Starter Plan) × 3 = $63/mes
- **Supabase**: $25/mes (Pro Plan)
- **Total**: ~$108/mes

## Próximos Pasos

1. ✅ Configurar cuentas en Vercel y Render
2. ✅ Agregar secrets en GitHub
3. ✅ Hacer push a rama `develop`
4. ✅ Verificar despliegue automático
5. ✅ Probar health checks
6. ✅ Configurar dominio personalizado
7. ✅ Configurar SSL/HTTPS
8. ✅ Configurar monitoreo y alertas
9. ✅ Documentar procedimientos de emergencia
10. ✅ Crear workflow para producción

## Soporte

Para problemas o preguntas:
- Revisar logs en Render/Vercel
- Consultar documentación oficial
- Contactar al equipo de desarrollo