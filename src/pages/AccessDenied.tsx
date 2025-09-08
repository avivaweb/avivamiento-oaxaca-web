import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-red-500">403</h1>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">Acceso Denegado</h2>
        <p className="text-gray-600 mt-2">No tienes permiso para ver esta página.</p>
        <Link to="/dashboard" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Volver al Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;