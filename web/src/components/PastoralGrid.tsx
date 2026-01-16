import Image from 'next/image';

const ZONES = [
    {
        id: 1,
        name: 'Jalpan',
        pastors: 'Ps. Familia Jalpan', // Placeholder
        description: 'Extendiendo el Reino en la zona de Jalpan con fidelidad y amor.',
        image: '/images/pastors/placeholder-jalpan.jpg' // Placeholder path
    },
    {
        id: 2,
        name: 'Cuilápam',
        pastors: 'Ps. Familia Cuilápam',
        description: 'Pastoreando el corazón de Cuilápam para Cristo.',
        image: '/images/pastors/placeholder-cuilapam.jpg'
    },
    {
        id: 3,
        name: 'Zaachila',
        pastors: 'Ps. Familia Zaachila',
        description: 'Estableciendo la cultura del Reino en Zaachila.',
        image: '/images/pastors/placeholder-zaachila.jpg'
    },
    {
        id: 4,
        name: 'San Nicolás',
        pastors: 'Ps. Familia San Nicolás',
        description: 'Levantando una generación apasionada en San Nicolás.',
        image: '/images/pastors/placeholder-sannicolas.jpg'
    },
    {
        id: 5,
        name: 'Cañada',
        pastors: 'Ps. Familia Cañada',
        description: 'Brillando la luz de Jesús en la región de la Cañada.',
        image: '/images/pastors/placeholder-canada.jpg'
    },
    {
        id: 6,
        name: 'Centro/Oaxaca Juárez',
        pastors: 'Ps. Familia Centro',
        description: 'El corazón de la ciudad latiendo al ritmo del cielo.',
        image: '/images/pastors/placeholder-centro.jpg'
    },
    {
        id: 7,
        name: 'Etla/Valles Centrales',
        pastors: 'Ps. Familia Etla',
        description: 'Conquistando los Valles Centrales para Su Gloria.',
        image: '/images/pastors/placeholder-etla.jpg'
    }
];

export default function PastoralGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {ZONES.map((zone) => (
                <div key={zone.id} className="flex flex-col items-center text-center group">
                    {/* Dealer/Avatar Container */}
                    <div className="relative w-48 h-48 mb-6 rounded-full p-1 border-2 border-[#DAA520]/30 group-hover:border-[#DAA520] transition-colors duration-500">
                        <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-200">
                            {/* In a real scenario, use next/image. For now using a div fallback if image fails or placeholder */}
                            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                                <span className="text-4xl">✝</span>
                            </div>
                            {/* Un-comment when images are real
                            <Image
                                src={zone.image}
                                alt={`Pastores ${zone.name}`}
                                fill
                                className="object-cover"
                            />
                            */}
                        </div>
                        {/* Authority Badge */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#DAA520] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg whitespace-nowrap z-10">
                            Zona No. {zone.id} - {zone.name}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-2 max-w-xs">
                        <h3 className="text-xl font-bold text-[#333333] font-serif">
                            {zone.pastors}
                        </h3>
                        <div className="w-12 h-0.5 bg-[#DAA520] mx-auto opacity-50"></div>
                        <p className="text-sm text-gray-600 leading-relaxed font-light">
                            {zone.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
