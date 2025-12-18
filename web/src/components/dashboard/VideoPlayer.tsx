'use client';

interface VideoPlayerProps {
    videoId: string;
    title?: string;
}

export default function VideoPlayer({ videoId, title }: VideoPlayerProps) {
    // Helper to extract ID if a full URL is passed
    const getYouTubeId = (urlOrId: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = urlOrId.match(regExp);
        return (match && match[2].length === 11) ? match[2] : urlOrId;
    };

    const finalVideoId = getYouTubeId(videoId);

    return (
        <div className="w-full relative pt-[56.25%] rounded-xl overflow-hidden shadow-2xl bg-black/90 ring-1 ring-white/10 group">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${finalVideoId}?rel=0&modestbranding=1`}
                title={title || "YouTube video player"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
}
