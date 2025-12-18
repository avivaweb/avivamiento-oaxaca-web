'use client';

import { useState } from 'react';
import {
  UserGroupIcon,
  CalendarIcon,
  CheckCircleIcon,
  UserPlusIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

// Mock data for members
const initialMembers = [
  { id: 1, name: 'Ana García', attended: false, avatar: 'AG' },
  { id: 2, name: 'Carlos Ruiz', attended: true, avatar: 'CR' },
  { id: 3, name: 'Elena Torres', attended: true, avatar: 'ET' },
  { id: 4, name: 'Miguel Ángel', attended: false, avatar: 'MA' },
  { id: 5, name: 'Sofía López', attended: true, avatar: 'SL' },
];

export default function MisCelulasPage() {
  const [members, setMembers] = useState(initialMembers);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const toggleAttendance = (id: number) => {
    setMembers(members.map(member =>
      member.id === id ? { ...member, attended: !member.attended } : member
    ));
  };

  const handleSubmitReport = () => {
    // Simulate API call
    setReportSubmitted(true);
    setTimeout(() => setReportSubmitted(false), 3000);
  };

  const attendanceCount = members.filter(m => m.attended).length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gestión de Célula</h1>
          <p className="mt-1 text-gray-500">Administra tu grupo familiar y reporta la asistencia semanal.</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 mr-2 bg-green-400 rounded-full"></span>
            Activo
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Section 1: Attendance Report */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Reporte de Asistencia</h2>
                <p className="text-sm text-gray-500">Semana del 10 al 16 de Diciembre</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#A5002F]">{attendanceCount}</span>
                <span className="text-gray-500 text-sm">/{members.length}</span>
              </div>
            </div>

            <div className="p-2">
              {members.map((member) => (
                <div
                  key={member.id}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${member.attended ? 'bg-red-50/30' : 'hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 border border-gray-200">
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className={`font-medium ${member.attended ? 'text-gray-900' : 'text-gray-600'}`}>
                        {member.name}
                      </h3>
                      {member.attended && (
                        <span className="text-xs text-[#A5002F] font-medium flex items-center mt-0.5">
                          <CheckCircleIcon className="w-3 h-3 mr-1" />
                          Presente
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleAttendance(member.id)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#A5002F] focus:ring-offset-2 ${member.attended ? 'bg-[#A5002F]' : 'bg-gray-200'
                      }`}
                  >
                    <span className="sr-only">Marcar asistencia</span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${member.attended ? 'translate-x-5' : 'translate-x-0'
                        }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <button
                onClick={handleSubmitReport}
                disabled={reportSubmitted}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-xl text-white font-medium shadow-sm transition-all duration-200 ${reportSubmitted
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-[#A5002F] hover:bg-[#8A0026] hover:shadow-md active:scale-[0.98]'
                  }`}
              >
                {reportSubmitted ? (
                  <>
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Reporte Enviado
                  </>
                ) : (
                  'Enviar Reporte Semanal'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Group Summary & Quick Actions */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

            <div className="relative">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Resumen del Grupo</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <UserPlusIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Miembro más nuevo</p>
                    <p className="text-base font-semibold text-gray-900 mt-1">Ana García</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                      Se unió hace 2 días
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Próxima Reunión</p>
                    <p className="text-base font-semibold text-gray-900 mt-1">Miércoles 8:00 PM</p>
                    <p className="text-xs text-gray-500 mt-1">Casa de Juan Pérez</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                    <UserGroupIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Crecimiento Mensual</p>
                    <p className="text-base font-semibold text-gray-900 mt-1">+2 Nuevos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Mini Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Ofrenda</p>
              <p className="text-xl font-bold text-gray-900 mt-1">$450</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Visitas</p>
              <p className="text-xl font-bold text-gray-900 mt-1">1</p>
            </div>
          </div>

          <button className="w-full py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
            <EllipsisHorizontalIcon className="w-5 h-5 mr-2" />
            Más Opciones
          </button>
        </div>
      </div>
    </div>
  );
}