import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://otqryfvktrckhlotqugo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90cXJ5ZnZrdHJja2hsb3RxdWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODcwMDMsImV4cCI6MjA2NjQ2MzAwM30.JxeiaBg-iYLhNP8CXFwNmOqzohMSDPguXc2h-HBe6r4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const testimonios = [
    {
      title: "Testimonio: Mi vida es un milagro, Dios me sanó de epilepsia | Testimonios Cristianos Impactantes",
      url: "http://www.youtube.com/watch?v=ryDf6FjdW8s",
    },
    {
      title: "Testimonio: Dios me sanó de múltiples identidades - Karen Bravo | Testimonios Cristianos",
      url: "http://www.youtube.com/watch?v=MWIF1Pwazxw",
    },
    {
      title: "Juan Muñoz y Paola Reyes - Dios tiene el control | Testimonios Cristianos | Vidas Cambiadas #69",
      url: "http://www.youtube.com/watch?v=E_UMeDeNjpQ",
    },
    {
      title: "📹 Vidas Cambiadas #6 (Vlog): Familia Olmos Tapias | El Lugar de Su Presencia",
      url: "http://www.youtube.com/watch?v=20BjhmEdWHk",
    },
    {
      title: "Testimonio Daniela Reyes: La iglesia es el mejor lugar donde puedo estar | Vidas Cambiadas #79",
      url: "http://www.youtube.com/watch?v=AxTuUAgry60",
    },
  ];

const seedTestimonios = async () => {
    const { error } = await supabase.from('testimonios').insert(testimonios);

    if (error) {
        console.error('Error seeding testimonios:', error);
    } else {
        console.log('Testimonios seeded successfully');
    }
};

seedTestimonios();