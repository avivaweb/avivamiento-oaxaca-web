import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 border border-gray-700 flex flex-col">
      {product.imagen_url && (
        <img
          src={product.imagen_url}
          alt={product.nombre}
          className="w-full h-48 object-cover object-center"
        />
      )}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-semibold text-divine-gold mb-2">{product.nombre}</h3>
        <p className="text-gray-300 text-sm mb-4 flex-grow">{product.descripcion}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-spiritual-red text-xl font-bold">${product.precio.toFixed(2)}</span>
          {product.stock > 0 ? (
            <span className="text-green-500 text-sm">En Stock: {product.stock}</span>
          ) : (
            <span className="text-red-500 text-sm">Agotado</span>
          )}
        </div>
        <button
          className={`mt-4 w-full py-2 rounded-md font-semibold transition duration-300
            ${product.stock > 0
              ? 'bg-spiritual-red text-white hover:bg-spiritual-red-dark'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
