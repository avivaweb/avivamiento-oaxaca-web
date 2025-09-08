1
import React from 'react';
import SermonCard from './SermonCard';

const SermonsList = ({ sermons }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sermons.map((sermon) => (
        <SermonCard key={sermon.id} sermon={sermon} />
      ))}
    </div>
  );
};

export default SermonsList;
