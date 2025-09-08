
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SermonCard = ({ sermon }) => {
  const { title, speaker, date, videoUrl, description } = sermon;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            src={videoUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <p className="text-sm text-gray-500 mb-2">Predicador: {speaker}</p>
        <p className="text-xs text-gray-400 mb-4">Fecha: {date}</p>
        <p className="text-sm">{description}</p>
      </CardContent>
      <CardFooter>
        <Button as="a" href={videoUrl} target="_blank" rel="noopener noreferrer">
          Ver en YouTube
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SermonCard;
