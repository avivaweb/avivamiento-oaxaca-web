
export default function MediaSkeleton() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-8">
                <span className="text-[var(--aviva-dorado)] font-bold uppercase tracking-widest text-sm animate-pulse">Cargando Diseños Eternos...</span>
            </div>
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="space-y-4 w-full md:w-1/2">
                    <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
                    <div className="h-10 w-3/4 bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="hidden md:block h-10 w-32 bg-gray-800 rounded-full animate-pulse" />
            </div>

            {/* Gallery Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-video bg-gray-800 rounded-xl animate-pulse" />
                ))}
            </div>

            {/* Spotify Skeleton */}
            <div className="space-y-4">
                <div className="h-8 w-48 bg-gray-800 rounded animate-pulse mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-[152px] bg-gray-800 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        </section>
    );
}
