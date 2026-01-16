'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactoRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Home and scroll to footer (assuming footer has an id or just scroll to bottom)
    // We can use a hash if the footer has an ID, e.g., #contact-footer
    router.replace('/#footer');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-[#DAA520]">
      <p>Redirigiendo a contacto...</p>
    </div>
  );
}