export default function EjercitoCelularPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ejército Celular</h1>
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <p className="text-gray-600">Vista de estructura celular para Pastor General.</p>
                <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-md">
                    <p className="text-sm font-medium">Solo visible para rol: Pastor General</p>
                </div>
            </div>
        </div>
    );
}
