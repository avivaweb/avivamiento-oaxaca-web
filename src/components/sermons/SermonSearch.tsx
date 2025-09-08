

import React from 'react';
import { Input } from '@/components/ui/input';

const SermonSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mb-8 max-w-lg mx-auto">
      <Input
        type="text"
        placeholder="Buscar por título, predicador o tema..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 text-lg bg-gris-oscuro-sutil border border-gray-600 rounded-lg focus:ring-divine-gold focus:border-divine-gold"
      />
    </div>
  );
};

export default SermonSearch;
