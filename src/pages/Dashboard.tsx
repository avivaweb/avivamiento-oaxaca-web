import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Para pie/doughnut si es necesario
  LineElement, // Para gráfico de líneas
  PointElement, // Para gráfico de líneas
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2'; // Usando react-chartjs-2 para una integración más sencilla

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement // Registrando ArcElement por si acaso para uso futuro u otros tipos de gráficos
);

// Función mock para visualizaciones de sermones (según el requisito)
const getSermonViews = async () => {
  // En una aplicación real, esto obtendría datos de Supabase o un servicio de análisis
  // Para demostración, devuelve datos mock
  return {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
    datasets: [
      {
        label: 'Visualizaciones de Sermones',
        data: [1200, 1500, 1300, 1800, 1600],
        backgroundColor: 'rgba(255, 215, 0, 0.6)', // Oro Divino
        borderColor: 'rgba(255, 215, 0, 1)',
        borderWidth: 1,
      },
    ],
  };
};

const Dashboard = () => {
  const [testimoniesChartData, setTestimoniesChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [sermonViewsChartData, setSermonViewsChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimoniesData = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonios')
          .select('created_at');

        if (error) throw error;

        // Procesar datos para el gráfico
        const monthlyCounts = {};
        data.forEach(testimony => {
          const date = new Date(testimony.created_at);
          const monthYear = `${date.toLocaleString('es-MX', { month: 'short' })} ${date.getFullYear()}`;
          monthlyCounts[monthYear] = (monthlyCounts[monthYear] || 0) + 1;
        });

        const labels = Object.keys(monthlyCounts).sort((a, b) => {
          const [monthA, yearA] = a.split(' ');
          const [monthB, yearB] = b.split(' ');
          const dateA = new Date(`${monthA} 1, ${yearA}`);
          const dateB = new Date(`${monthB} 1, ${yearB}`);
          return dateA - dateB;
        });
        const counts = labels.map(label => monthlyCounts[label]);

        setTestimoniesChartData({
          labels: labels,
          datasets: [
            {
              label: 'Testimonios Creados',
              data: counts,
              backgroundColor: 'rgba(199, 0, 57, 0.6)', // Rojo Espiritual
              borderColor: 'rgba(199, 0, 57, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error('Error fetching testimonies for chart:', err.message);
        setError('Error al cargar datos de testimonios.');
      }
    };

    const fetchSermonViewsData = async () => {
      try {
        const data = await getSermonViews();
        setSermonViewsChartData(data);
      } catch (err) {
        console.error('Error fetching sermon views:', err.message);
        setError('Error al cargar datos de visualizaciones de sermones.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimoniesData();
    fetchSermonViewsData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Cargando Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-extrabold text-center text-negro-sagrado mb-12 drop-shadow-lg">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de Testimonios */}
        <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-spiritual-red mb-4">Testimonios Creados por Mes</h2>
          <Bar
            data={testimoniesChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Número de Testimonios',
                },
              },
            }}
          />
        </div>

        {/* Gráfico de Visualizaciones de Sermones */}
        <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-spiritual-red mb-4">Visualizaciones de Sermones por Semana</h2>
          <Line
            data={sermonViewsChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Visualizaciones',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Comentario sobre GA4 */}
      <div className="mt-12 p-6 bg-gray-100 rounded-xl shadow-inner border border-gray-300">
        <h2 className="text-2xl font-bold text-negro-sagrado mb-4">Nota sobre Google Analytics 4 (GA4)</h2>
        <p className="text-gray-700 leading-relaxed">
          Para medir "Visualizaciones de sermones" en GA4 cuando un usuario carga la página de sermones (`/sermones`),
          debes enviar un evento personalizado. Esto se hace típicamente en el componente de la página de sermones (`src/pages/Sermons.jsx`)
          o en un script de inicialización de GA4 que se ejecuta en cada carga de página.
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          Aquí un ejemplo de cómo podrías enviar un evento en `src/pages/Sermons.jsx` usando el hook `useEffect` de React:
        </p>
        <pre className="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-x-auto text-sm">
          <code>
{
`// En src/pages/Sermons.jsx
import React, { useEffect } from 'react';
// ... otras importaciones

const SermonsPage = () => {
  useEffect(() => {
    // Asegúrate de que gtag esté disponible globalmente (configurado en index.html o similar)
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: 'Página de Sermones',
        page_location: window.location.href,
        page_path: '/sermones',
        // Puedes añadir parámetros personalizados si es necesario
        event_category: 'Contenido',
        event_label: 'Visualización de Sermones',
      });
      // O un evento más específico si quieres contar cada "visualización de sermón" individualmente
      // window.gtag('event', 'sermon_view', {
      //   sermon_id: 'ID_DEL_SERMON',
      //   sermon_title: 'Título del Sermón',
      // });
    }
  }, []); // Se ejecuta una vez al montar el componente

  // ... el resto de tu componente SermonsPage
};

export default SermonsPage;`}
          </code>
        </pre>
        <p className="text-gray-700 leading-relaxed mt-2">
          Asegúrate de haber inicializado GA4 en tu `index.html` o en un script global para que `window.gtag` esté disponible.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
