# Configuración de Secrets Críticos del Hosting

## Introducción

Este documento describe el proceso de configuración manual de variables de entorno críticas para el despliegue de la aplicación AVIVA en entornos de hosting. La configuración debe realizarse con extrema precaución para evitar exposiciones de seguridad.

## Variables Críticas

Las siguientes variables de entorno son esenciales para el funcionamiento correcto de la aplicación:

1. **DATABASE_URL**
   - **Descripción**: URL de conexión a la base de datos Supabase.
   - **Formato**: `postgresql://[usuario]:[contraseña]@[host]:[puerto]/[base_de_datos]`
   - **Ejemplo**: `postgresql://postgres:password@db.aviva.com:5432/aviva_db`

2. **PORT**
   - **Descripción**: Puerto en el que la aplicación escuchará conexiones.
   - **Valor recomendado**: `3000` (para desarrollo) o `80`/`443` (para producción)

## Advertencia Crítica de Seguridad

⚠️ **IMPORTANTE**: Nunca copies valores reales de variables de entorno desde archivos locales (como `.env`) directamente a configuraciones de hosting. Los valores reales contienen credenciales sensibles que podrían comprometer la seguridad si se exponen.

- Utiliza siempre valores simulados o placeholders durante pruebas.
- Configura las variables reales únicamente a través de interfaces seguras del proveedor de hosting (ej. Vercel Environment Variables, GitHub Secrets).
- Verifica que las variables se actualicen correctamente en el pipeline de CI/CD y en la configuración de Next.js, recordando la regla de dependencia de variables de entorno públicas (`NEXT_PUBLIC_*`).

## Proceso de Configuración

1. Accede al panel de administración de tu proveedor de hosting (ej. Vercel, Render, etc.).
2. Navega a la sección de variables de entorno o "Environment Variables".
3. Agrega las variables críticas mencionadas anteriormente.
4. Para `DATABASE_URL`, utiliza la URL proporcionada por Supabase (asegúrate de que sea la de staging/production, no local).
5. Para `PORT`, configura el puerto apropiado según el entorno.
6. Guarda los cambios y redeploy la aplicación.

## URL Final Simulada

Después de la configuración, la aplicación estará disponible en: `https://aviva-core-api-staging.com`

Verifica que la aplicación responda correctamente en esta URL antes de proceder con validaciones adicionales.

## Notas Adicionales

- Mantén un registro seguro de los valores reales de las variables (fuera del repositorio).
- Realiza pruebas exhaustivas después de cada cambio en la configuración.
- Si se modifica el pipeline de CI/CD o la configuración de Next.js, recuerda verificar que las variables de entorno se hayan actualizado correctamente en Vercel/GitHub Secrets.