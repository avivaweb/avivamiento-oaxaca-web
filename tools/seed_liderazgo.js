
// tools/seed_liderazgo.js
const { createClient } = require('@supabase/supabase-js');
const { generalPastors, zonePastors } = require('../src/data/leadershipData.js');

// Carga las variables de entorno
require('dotenv').config({ path: '../.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing in .env.local");
}

// IMPORTANTE: Para operaciones de escritura, usamos la Service Role Key por seguridad.
// Debes obtenerla de tu dashboard de Supabase (Settings -> API) y añadirla a tu .env.local
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
if (!supabaseServiceKey) {
  throw new Error("SUPABASE_SERVICE_KEY is missing in .env.local. This is required for seeding data.");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const seedLeadership = async () => {
  // Mapear los datos a la estructura de la nueva tabla
  const leadershipData = [
    ...generalPastors.map(p => ({
      nombre: p.name,
      rol: p.title,
      bio: p.description,
      foto_url: p.image
    })),
    ...zonePastors.map(p => ({
      nombre: p.name,
      rol: 'Pastor de Zona',
      zona: p.zone,
      bio: p.description,
      foto_url: p.image
    }))
  ];

  // Limpiar la tabla antes de insertar nuevos datos para evitar duplicados
  console.log('Deleting existing leadership data...');
  const { error: deleteError } = await supabase.from('liderazgo').delete().neq('id', 0);
  if (deleteError) {
    console.error('Error deleting data:', deleteError);
    return;
  }

  // Insertar los datos en la tabla 'liderazgo'
  console.log('Inserting new leadership data...');
  const { data, error } = await supabase.from('liderazgo').insert(leadershipData);

  if (error) {
    console.error('Error seeding leadership data:', error);
  } else {
    console.log('Successfully seeded leadership data!', data);
  }
};

seedLeadership();
