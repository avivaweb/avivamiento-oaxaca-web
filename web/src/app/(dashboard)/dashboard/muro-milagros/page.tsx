import MiracleWall from '@/components/dashboard/MiracleWall';

export default function MuroMilagrosPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Muro de Milagros</h1>
            <div className="bg-[#0a0a0a] rounded-lg shadow p-6 border border-white/10">
                <MiracleWall />
            </div>
        </div>
    );
}
