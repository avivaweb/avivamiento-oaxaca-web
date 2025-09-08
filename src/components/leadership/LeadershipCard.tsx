import React from 'react';

const LeadershipCard = ({ name, role, image_url, description }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 border border-gray-700">
      <img src={image_url || '/img/placeholder-avatar.png'} alt={name} className="w-full h-56 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-divine-gold mb-1">{name}</h3>
        <p className="text-spiritual-red text-lg mb-4">{role}</p>
        <p className="text-gray-300 text-base line-clamp-4">{description}</p>
      </div>
    </div>
  );
};

export default LeadershipCard;
