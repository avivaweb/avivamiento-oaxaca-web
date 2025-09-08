import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("idle"); // 'idle', 'submitting', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    const { error } = await supabase.from('subscribers').insert([
      { email: formData.email }
    ]);

    if (error) {
      console.error("Error al enviar el formulario:", error);
      setFormStatus("error");
    } else {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-2xl px-4 py-8 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          ¡Gracias por tu interés!
        </h1>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          En este momento estamos construyendo nuestro sitio web. Por favor, déjanos tu correo electrónico y te avisaremos cuando estemos listos.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Correo Electrónico
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {formStatus === "submitting" ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>

        {formStatus === "success" && (
          <p className="mt-4 text-sm text-center text-green-600 dark:text-green-400">
            ¡Gracias por suscribirte! Te avisaremos cuando el sitio esté en línea.
          </p>
        )}

        {formStatus === "error" && (
          <p className="mt-4 text-sm text-center text-red-600 dark:text-red-400">
            Ocurrió un error. Por favor, inténtalo de nuevo.
          </p>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        &copy; 2025 Iglesia Avivamiento. Todos los derechos reservados.
      </p>
    </div>
  );
}