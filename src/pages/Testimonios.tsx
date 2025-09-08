import React, { useState } from 'react';
import { useTestimonies } from '../contexts/TestimoniesContext.jsx';
import usePageMetadata from '../lib/usePageMetadata';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Loader, AlertTriangle, BookOpen } from 'lucide-react';
import TestimonyCard from '../components/testimonies/TestimonyCard.tsx';

const TestimonySkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/80">
        <div className="bg-gray-200 h-56 w-full animate-pulse"></div>
        <div className="p-6">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        </div>
    </div>
);

const TestimoniosPage = () => {
  const { testimonies, isLoading, error } = useTestimonies();
  const [currentPage, setCurrentPage] = useState(1);
  const testimoniesPerPage = 9;

  usePageMetadata({
    title: "Testimonios de Sanidad y Milagros - Iglesia Avivamiento",
    description: "Descubre testimonios impactantes de sanidad divina, milagros y restauración en la iglesia Avivamiento. Historias reales que edifican la fe.",
  });

  const currentTestimonies = testimonies.slice(
    (currentPage - 1) * testimoniesPerPage,
    currentPage * testimoniesPerPage
  );

  const totalPages = Math.ceil(testimonies.length / testimoniesPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => <TestimonySkeleton key={i} />)}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12 col-span-full bg-red-50 border border-red-200 p-8 rounded-lg">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-red-700">Ocurrió un Error</h3>
          <p className="text-gris-oscuro-sutil">No se pudieron cargar los testimonios. Por favor, intenta recargar la página.</p>
        </div>
      );
    }

    if (testimonies.length === 0) {
      return (
        <div className="text-center py-12 col-span-full">
            <BookOpen className="h-16 w-16 text-gray-300 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-negro-sagrado">Aún no hay testimonios</h3>
            <p className="text-gris-oscuro-sutil mt-2">Sé el primero en compartir lo que Dios ha hecho en tu vida.</p>
        </div>
      );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentTestimonies.map((testimony, index) => (
                <TestimonyCard key={testimony.id} testimony={testimony} index={index} />
            ))}
        </div>
    );
  }

  return (
    <>
    <Helmet>
        <title>Testimonios - Iglesia Avivamiento</title>
        <meta name="description" content="Historias reales de fe, sanidad y milagros. Descubre lo que Dios está haciendo en la vida de las personas en nuestra comunidad." />
    </Helmet>
    <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16 sm:py-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-display font-bold text-negro-sagrado mb-4">
                    Testimonios de Poder y Gracia
                </h1>
                <p className="text-xl text-gris-oscuro-sutil max-w-3xl mx-auto">
                    Historias reales de vidas transformadas por el poder de Dios. La evidencia de Su amor y fidelidad.
                </p>
            </motion.div>

            {renderContent()}

            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-12">
                {[...Array(totalPages).keys()].map((number) => (
                    <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentPage === number + 1 ? 'bg-rojo-espiritual text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200 border'}`}>
                    {number + 1}
                    </button>
                ))}
                </div>
            )}
        </div>
    </div>
    </>
  );
};

export default TestimoniosPage;