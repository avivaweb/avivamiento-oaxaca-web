import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Helmet } from 'react-helmet-async';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side validation
    if (!fullName) {
      toast({
        title: "Error de Validación",
        description: "El nombre completo es requerido.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    if (!email) {
      toast({
        title: "Error de Validación",
        description: "El correo electrónico es requerido.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Error de Validación",
        description: "Por favor, introduce un correo electrónico válido.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    if (!password) {
      toast({
        title: "Error de Validación",
        description: "La contraseña es requerida.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Error de Validación",
        description: "La contraseña debe tener al menos 6 caracteres.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    };
    if (password !== confirmPassword) {
      toast({
        title: "Error de Validación",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password, fullName);
      toast({
        title: "Registro Exitoso",
        description: "Tu cuenta ha sido creada. Por favor, revisa tu correo para confirmar tu cuenta e inicia sesión.",
      });
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      let errorMessage = "Ocurrió un error inesperado al registrarse.";
      if (error.message.includes("User already registered")) {
        errorMessage = "Ya existe una cuenta con este correo electrónico.";
      } else if (error.message.includes("Password should be at least 6 characters")) {
        errorMessage = "La contraseña debe tener al menos 6 caracteres.";
      } else {
        errorMessage = error.message; // Fallback to generic message
      }

      toast({
        title: "Error al Registrar",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Registrarse - Avivamiento Oaxaca</title>
        <meta name="description" content="Regístrate para crear una nueva cuenta en Avivamiento y acceder a recursos internos." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-blanco-puro py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md border border-gray-200">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Crear Nueva Cuenta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              O <Link to="/login" className="font-medium text-rojo-espiritual hover:text-rojo-espiritual-dark">inicia sesión con tu cuenta existente</Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="grid gap-2 mb-4">
                <Label htmlFor="full-name">Nombre Completo</Label>
                <Input
                  id="full-name"
                  name="full-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Tu Nombre Completo"
                />
              </div>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="email-address">Correo Electrónico</Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@ejemplo.com"
                />
              </div>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmar Contraseña"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blanco-puro bg-rojo-espiritual hover:bg-rojo-espiritual-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rojo-espiritual"
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Registrar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
