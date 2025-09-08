// supabase/functions/send-welcome-email/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from 'https://esm.sh/resend@3.2.0';

// Inicializa el cliente de Resend con la clave API desde los secretos de Supabase.
// Asegúrate de configurar el secreto `RESEND_API_KEY` en tu proyecto:
// Panel de Supabase -> Settings -> Secrets
const resend = new Resend(Deno.env.get('RESEND_API_KEY')!);

console.log("Función 'send-welcome-email' inicializada.");

serve(async (req) => {
  try {
    // 1. Extraer los datos del nuevo suscriptor desde el payload del webhook.
    const { record } = await req.json();
    const userEmail = record?.email;

    // Validación básica para asegurar que el email existe.
    if (!userEmail) {
      throw new Error("El email no se encontró en el payload del webhook.");
    }

    console.log(`Petición recibida para enviar correo de bienvenida a: ${userEmail}`);

    // 2. Definir el contenido del correo electrónico.
    const subject = "¡Bienvenido a Avivamiento Oaxaca! Tu nuevo hogar digital está por llegar.";
    const body = `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <p>Hola,</p>
        <p>Te damos la bienvenida a la comunidad de <strong>Avivamiento Oaxaca</strong>. Gracias por tu interés en nuestro nuevo sitio web. Estaremos en contacto pronto con más novedades.</p>
        <p>Mientras tanto, nos encantaría verte en nuestras reuniones:</p>
        <ul>
          <li><strong>Martes (Reunión de Oración):</strong> 6:30 pm</li>
          <li><strong>Domingos (Reunión General):</strong> 11:00 am</li>
        </ul>
        <p>¡Dios te bendiga!</p>
        <p><em>El equipo de Avivamiento Oaxaca</em></p>
      </div>
    `;

    // 3. Enviar el correo utilizando Resend.
    const { data, error } = await resend.emails.send({
      // IMPORTANTE: Reemplaza 'noreply@tudominio.com' con tu dominio verificado en Resend.
      from: 'Avivamiento Oaxaca <noreply@tudominio.com>',
      to: [userEmail],
      subject: subject,
      html: body,
    });

    // Manejar posibles errores de la API de Resend.
    if (error) {
      console.error("Error al enviar el correo vía Resend:", error);
      throw new Error(error.message);
    }

    console.log(`Correo enviado exitosamente a ${userEmail}. ID de Resend: ${data?.id}`);

    // 4. Devolver una respuesta de éxito.
    return new Response(
      JSON.stringify({ message: `Correo enviado a ${userEmail}` }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    // 5. Manejar cualquier error que ocurra durante el proceso.
    console.error("Ocurrió un error:", err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
