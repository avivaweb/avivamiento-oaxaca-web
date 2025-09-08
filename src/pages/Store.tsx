import React, { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabaseClient'; // Assuming supabaseClient.js is configured
// import ProductCard from '../components/ProductCard.tsx';

const Store = () => {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from('productos')
  //         .select('*')
  //         .order('nombre', { ascending: true });

  //       if (error) throw error;
  //       setProducts(data);
  //     } catch (err) {
  //       console.error('Error fetching products:', err.message);
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // if (loading) return <div className="text-center text-white text-xl mt-8">Cargando tienda...</div>;
  // if (error) return <div className="text-center text-red-500 text-xl mt-8">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-divine-gold text-center mb-12">Nuestra Tienda de Recursos (Simplified)</h1>

      {/*
      {products.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No hay productos disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      */}

      <p className="text-center text-gray-400 text-lg">Contenido simplificado para depuración.</p>

      {/*
        // Integración de Pasarela de Pago (Ej. Stripe)
        // ... (commented out for now)
      */}
    </div>
  );
};

export default Store;