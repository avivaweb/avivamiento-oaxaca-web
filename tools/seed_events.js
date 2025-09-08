import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://otqryfvktrckhlotqugo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90cXJ5ZnZrdHJja2hsb3RxdWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODcwMDMsImV4cCI6MjA2NjQ2MzAwM30.JxeiaBg-iYLhNP8CXFwNmOqzohMSDPguXc2h-HBe6r4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const events = [
    {
      title: "Congreso de Avivamiento 2025",
      category: "congreso",
      date: "2025-01-15",
      endDate: "2025-01-17",
      time: "18:00",
      location: "Templo Principal",
      description: "Tres días de gloria, poder y transformación. Ven y experimenta un encuentro sobrenatural con Dios.",
      speaker: "Pastor Natanael Martínez y invitados especiales",
      capacity: 500,
      registered: 342,
      price: "Entrada libre",
      featured: true,
      image: "Congreso de avivamiento con multitud adorando en el templo principal"
    },
    {
      title: "Vigilia de Año Nuevo",
      category: "vigilia",
      date: "2024-12-31",
      time: "22:00",
      endTime: "02:00",
      location: "Templo Principal",
      description: "Despidamos el año en oración y adoración, recibiendo el nuevo año con fe y esperanza.",
      speaker: "Equipo Pastoral",
      capacity: 300,
      registered: 156,
      price: "Entrada libre",
      image: "Vigilia de oración con velas encendidas y congregación orando"
    },
    {
      title: "Bautizos en Agua",
      category: "bautizo",
      date: "2025-01-05",
      time: "16:00",
      location: "Río Atoyac",
      description: "Ceremonia especial de bautizos en las aguas del río. Un momento de decisión y testimonio público.",
      speaker: "Pastor Natanael Martínez",
      capacity: 100,
      registered: 23,
      price: "Entrada libre",
      image: "Ceremonia de bautizos en el río con pastor y candidatos"
    },
    {
      title: "Conferencia de Mujeres",
      category: "conferencia",
      date: "2025-02-08",
      endDate: "2025-02-09",
      time: "09:00",
      location: "Salón de Eventos",
      description: "Dos días de inspiración, sanidad interior y fortalecimiento para las mujeres de Dios.",
      speaker: "Pastora Betsy Martínez y invitadas especiales",
      capacity: 200,
      registered: 89,
      price: "$200 MXN",
      image: "Conferencia de mujeres con pastora ministrando a damas"
    },
    {
      title: "Retiro de Jóvenes",
      category: "retiro",
      date: "2025-02-21",
      endDate: "2025-02-23",
      time: "08:00",
      location: "Centro de Retiros Montaña",
      description: "Fin de semana de aventura, adoración y crecimiento espiritual para jóvenes.",
      speaker: "Pastor Miguel Hernández",
      capacity: 80,
      registered: 45,
      price: "$500 MXN",
      image: "Jóvenes en retiro adorando en la naturaleza con guitarras"
    },
    {
      title: "Noche de Milagros",
      category: "especial",
      date: "2025-03-07",
      time: "19:00",
      location: "Templo Principal",
      description: "Una noche especial de oración por sanidad, milagros y liberación.",
      speaker: "Equipo de Sanidad Interior",
      capacity: 400,
      registered: 178,
      price: "Entrada libre",
      image: "Noche de milagros con oración por sanidad e imposición de manos"
    }
  ];

const seedEvents = async () => {
    const { error } = await supabase.from('events').insert(events);

    if (error) {
        console.error('Error seeding events:', error);
    } else {
        console.log('Events seeded successfully');
    }
};

seedEvents();