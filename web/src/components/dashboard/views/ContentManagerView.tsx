import Link from 'next/link';

export default function ContentManagerView() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/dashboard/sermones" className="block">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Sermones</h3>
                    <p className="text-gray-600 mt-2">Gestionar archivo de sermones y prédicas.</p>
                </div>
            </Link>

            <Link href="/dashboard/blog" className="block">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Blog</h3>
                    <p className="text-gray-600 mt-2">Crear y editar artículos para la web.</p>
                </div>
            </Link>

            <Link href="/dashboard/galeria" className="block">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Galería</h3>
                    <p className="text-gray-600 mt-2">Administrar fotos y multimedia.</p>
                </div>
            </Link>
        </div>
    );
}
