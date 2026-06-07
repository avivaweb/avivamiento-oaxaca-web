import { createClient } from '@supabase/supabase-js';

export interface HomepageMetrics {
  yearsOfGlory: number;
  zonesCount: number;
  activeGroupsCount: number;
  totalReportsCount: number;
}

export interface FeaturedEvent {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  date_start: string;
  date_end: string | null;
  location: string;
  category: string;
  price: string | null;
  cta_label: string | null;
  cta_link: string | null;
  is_hero: boolean;
  status: string;
}

/**
 * Obtiene métricas reales de la iglesia desde Supabase
 * para la sección "El Altar" de la homepage
 */
export async function fetchHomepageMetrics(): Promise<HomepageMetrics> {
  const FOUNDING_YEAR = 2015; // Año de fundación de Avivamiento Oaxaca

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return getDefaultMetrics(FOUNDING_YEAR);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Ejecutar consultas en paralelo para eficiencia
    const [groupsResult, reportsResult, zonesResult] = await Promise.all([
      supabase
        .from('grupos_familiares')
        .select('id', { count: 'exact', head: true }),
      supabase
        .from('celula_reports')
        .select('id', { count: 'exact', head: true }),
      supabase
        .from('Zone')
        .select('id', { count: 'exact', head: true }),
    ]);

    const currentYear = new Date().getFullYear();
    const yearsOfGlory = currentYear - FOUNDING_YEAR;

    const zonesCount = zonesResult.count || 5;

    return {
      yearsOfGlory,
      zonesCount,
      activeGroupsCount: groupsResult.count || 0,
      totalReportsCount: reportsResult.count || 0,
    };
  } catch (error) {
    console.error('[fetchHomepageMetrics] Error:', error);
    return getDefaultMetrics(FOUNDING_YEAR);
  }
}

/**
 * Obtiene los próximos eventos para la sección "Agenda de Fuego"
 * Solo devuelve eventos futuros o el más reciente pasado (si no hay ninguno futuro)
 */
export async function fetchUpcomingEvents(limit: number = 3): Promise<FeaturedEvent[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return [];
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('date_start', now) // Solo eventos futuros
      .order('date_start', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('[fetchUpcomingEvents] Supabase error:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('[fetchUpcomingEvents] Error:', error);
    return [];
  }
}

/**
 * Obtiene el evento hero (el más próximo con is_hero = true)
 */
export async function fetchHeroEvent(): Promise<FeaturedEvent | null> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) return null;

    const supabase = createClient(supabaseUrl, supabaseKey);
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_hero', true)
      .gte('date_start', now)
      .order('date_start', { ascending: true })
      .limit(1)
      .single();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

// ── Fallbacks ─────────────────────────────────────────────────
function getDefaultMetrics(FOUNDING_YEAR: number): HomepageMetrics {
  return {
    yearsOfGlory: new Date().getFullYear() - FOUNDING_YEAR,
    zonesCount: 5,
    activeGroupsCount: 0,
    totalReportsCount: 0,
  };
}
