# Configuración de Variables de Entorno en Vercel para el Frontend

## Variable Crítica: NEXT_PUBLIC_API_URL

La variable de entorno `NEXT_PUBLIC_API_URL` es esencial para que el frontend (Next.js) se comunique con el backend de la API principal.

### Valor Simulado
- **Valor:** `https://aviva-core-api-staging.com`

Este valor debe configurarse en las variables de entorno de Vercel para el entorno de staging.

## Recordatorio: Conectar Repositorio web/ a Vercel

Asegúrate de que el repositorio `web/` esté conectado a Vercel. Esto permite el despliegue automático y la gestión de variables de entorno.

### Pasos para Conectar:
1. Accede a tu cuenta de Vercel.
2. Importa el proyecto desde GitHub seleccionando el repositorio `web/`.
3. Configura las variables de entorno en la sección "Environment Variables" del dashboard de Vercel.

## URL Simulada del Frontend
- **URL:** `https://avivamiento-web-staging.vercel.app`

Esta es la URL simulada para el entorno de staging del frontend desplegado en Vercel.

### Instrucciones Adicionales
- Verifica que las variables de entorno se actualicen correctamente en Vercel después de cualquier cambio en el pipeline de CI/CD o configuración de Next.js.
- Asegúrate de que el frontend dependa únicamente de variables públicas (`NEXT_PUBLIC_...`) para acceder a servicios backend.