
import React from 'react';
import ReactPlayer from 'react-player/youtube';

interface LiveStreamPlayerProps {
  videoId: string;
}

/**
 * Componente para mostrar la transmisión en vivo de YouTube.
 * Utiliza react-player, que a su vez usa el reproductor de YouTube.
 * La calidad de la transmisión se ajusta automáticamente gracias a la tecnología
 * de streaming de bitrate adaptativo (ABR) nativa de YouTube.
 */
const LiveStreamPlayer: React.FC<LiveStreamPlayerProps> = ({ videoId }) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className='player-wrapper' style={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
      <ReactPlayer
        className='react-player'
        url={youtubeUrl}
        width='100%'
        height='100%'
        style={{ position: 'absolute', top: 0, left: 0 }}
        controls={true}
        playing={true} // Opcional: para que inicie automáticamente
        config={{
          youtube: {
            playerVars: {
              // Opciones adicionales del reproductor de YouTube
              // Por ejemplo: autoplay: 1, modestbranding: 1
            }
          }
        }}
      />
    </div>
  );
};

export default LiveStreamPlayer;
