# Arquitectura de Despliegue de Microservicios AVIVA

## Regla: Dependencia de Variables de Entorno de Despliegue

La aplicación `web/` (Next.js - Frontend) depende de variables de entorno públicas (`NEXT_PUBLIC_...`) para acceder a los servicios de Backend.

**Servicios Críticos y sus Variables:**

1.  **Core System API (NestJS):**
    * **Propósito:** Autenticación, Gestión Celular.
    * **Variable:** `NEXT_PUBLIC_API_URL`
    * **Valor:** `http://localhost:3002` (Local) o `https://api-staging.aviva.com` (Staging)

2.  **CMS (Payload):**
    * **Propósito:** Contenido Público (Posts, Eventos).
    * **Variable:** `NEXT_PUBLIC_CMS_URL`
    * **Valor:** `http://localhost:3001` (Local) o `https://cms-staging.aviva.com` (Staging)

3.  **Motor de IA:**
    * **Propósito:** Automatización de Contenido.
    * **Variable:** `NEXT_PUBLIC_AI_URL`
    * **Valor:** `http://localhost:4000` (Local) o `https://ai-staging.aviva.com` (Staging)

**Instrucción para KiloGuru (Automejora):**
Ante cualquier modificación al pipeline de CI/CD, al módulo de Autenticación, o a la configuración de Next.js, DEBES recordar al usuario la existencia de esta regla y verificar que las variables de entorno se hayan actualizado correctamente en Vercel/GitHub Secrets.