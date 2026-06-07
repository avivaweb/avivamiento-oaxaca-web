'use client';

import { ExclamationTriangleIcon, WifiIcon, ShieldExclamationIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

/** Classified error types for user-friendly messaging */
export type ErrorType = 'network' | 'permissions' | 'unknown';

interface ErrorStateProps {
    /** The type of error to display */
    errorType: ErrorType;
    /** Optional raw message for debugging (shown in smaller text) */
    rawMessage?: string;
    /** Callback fired when the user clicks "Reintentar Conexión" */
    onRetry: () => void;
    /** Whether a retry is currently in progress */
    retrying?: boolean;
}

const ERROR_CONFIG: Record<ErrorType, {
    icon: typeof ExclamationTriangleIcon;
    title: string;
    description: string;
    hint: string;
}> = {
    network: {
        icon: WifiIcon,
        title: 'Sin conexión al servidor',
        description: 'No pudimos conectar con la base de datos. Esto puede deberse a una conexión a internet inestable o a un problema temporal del servidor.',
        hint: 'Verifica tu conexión a internet y vuelve a intentar. Si el problema persiste, espera unos minutos — todo está bajo control.',
    },
    permissions: {
        icon: ShieldExclamationIcon,
        title: 'Acceso restringido',
        description: 'Tu sesión no tiene los permisos necesarios para acceder a esta información. Esto puede ocurrir si tu rol no está configurado correctamente o si la sesión expiró.',
        hint: 'Intenta cerrar sesión y volver a ingresar. Si continúa, contacta a tu pastor de zona para verificar tus permisos.',
    },
    unknown: {
        icon: ExclamationTriangleIcon,
        title: 'Algo no salió como esperábamos',
        description: 'Ocurrió un error inesperado al cargar las métricas. Nuestro equipo ya fue notificado.',
        hint: 'Puedes reintentar la conexión. Si el error persiste, comunícate con soporte técnico.',
    },
};

/**
 * Classifies a Supabase error into a user-friendly ErrorType.
 * Checks common Supabase/PostgREST error patterns.
 */
export function classifySupabaseError(error: unknown): ErrorType {
    if (!error) return 'unknown';

    const message = typeof error === 'object' && error !== null
        ? (error as any).message || (error as any).msg || JSON.stringify(error)
        : String(error);

    const code = typeof error === 'object' && error !== null
        ? (error as any).code || ''
        : '';

    const lowerMsg = message.toLowerCase();

    // Network-level errors
    if (
        lowerMsg.includes('fetch') ||
        lowerMsg.includes('networkerror') ||
        lowerMsg.includes('failed to fetch') ||
        lowerMsg.includes('net::') ||
        lowerMsg.includes('econnrefused') ||
        lowerMsg.includes('timeout') ||
        lowerMsg.includes('dns') ||
        lowerMsg.includes('offline') ||
        code === 'PGRST301'
    ) {
        return 'network';
    }

    // RLS / permissions errors
    if (
        lowerMsg.includes('permission denied') ||
        lowerMsg.includes('rls') ||
        lowerMsg.includes('row-level security') ||
        lowerMsg.includes('policy') ||
        lowerMsg.includes('jwt') ||
        lowerMsg.includes('unauthorized') ||
        lowerMsg.includes('403') ||
        code === '42501' || // insufficient_privilege
        code === 'PGRST302' ||
        code === 'PGRST116'
    ) {
        return 'permissions';
    }

    return 'unknown';
}

export default function ErrorState({ errorType, rawMessage, onRetry, retrying = false }: ErrorStateProps) {
    const config = ERROR_CONFIG[errorType];
    const Icon = config.icon;

    return (
        <div
            role="alert"
            aria-live="assertive"
            className="relative bg-gradient-to-br from-[#1a0a0a] to-black border-2 border-aviva-red rounded-2xl p-8 md:p-10 shadow-[0_0_30px_rgba(165,0,47,0.15)] overflow-hidden"
        >
            {/* Subtle corner glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-aviva-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-aviva-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
                {/* Icon with golden accent ring */}
                <div className="mb-6 relative">
                    <div className="w-20 h-20 rounded-full bg-black border-2 border-aviva-gold/40 flex items-center justify-center shadow-[0_0_20px_rgba(218,165,32,0.15)]">
                        <Icon className="w-10 h-10 text-[#DAA520] drop-shadow-[0_0_8px_rgba(218,165,32,0.4)]" />
                    </div>
                    {/* Pulse ring animation */}
                    <div className="absolute inset-0 rounded-full border-2 border-aviva-red/30 animate-ping opacity-30" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-aviva-bone tracking-wide mb-3">
                    {config.title}
                </h3>

                {/* Description */}
                <p className="text-base text-[#B4B4B4] leading-relaxed mb-2">
                    {config.description}
                </p>

                {/* Hint — calming / "Paz y Control" language */}
                <p className="text-sm text-aviva-gold/80 italic mb-6">
                    💡 {config.hint}
                </p>

                {/* Raw error for debugging (collapsible) */}
                {rawMessage && (
                    <details className="w-full mb-6 text-left">
                        <summary className="text-xs text-[#666] cursor-pointer hover:text-[#999] transition-colors select-none">
                            Detalles técnicos
                        </summary>
                        <pre className="mt-2 text-xs text-[#555] bg-black/60 border border-white/5 rounded-lg p-3 overflow-x-auto font-mono max-h-24 break-all whitespace-pre-wrap">
                            {rawMessage}
                        </pre>
                    </details>
                )}

                {/* Retry Button */}
                <button
                    id="btn-retry-connection"
                    onClick={onRetry}
                    disabled={retrying}
                    className={`
                        group flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-widest
                        transition-all duration-300 ease-out
                        ${retrying
                            ? 'bg-aviva-gold/20 text-aviva-gold/50 cursor-wait border border-aviva-gold/20'
                            : 'bg-aviva-red text-white border border-aviva-gold/30 hover:bg-aviva-gold-dark hover:text-black hover:border-aviva-gold hover:shadow-[0_0_20px_rgba(218,165,32,0.3)] active:scale-95'
                        }
                    `}
                >
                    <ArrowPathIcon className={`w-5 h-5 ${retrying ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                    {retrying ? 'Reconectando...' : 'Reintentar Conexión'}
                </button>

                {/* "Paz y Control" footer */}
                <p className="mt-6 text-xs text-[#444] uppercase tracking-[0.2em]">
                    Tu información está segura · Pasión 2026
                </p>
            </div>
        </div>
    );
}
