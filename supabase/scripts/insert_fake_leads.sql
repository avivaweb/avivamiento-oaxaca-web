-- Script to insert fake leads for testing into the 'subscriber' table (Leads Module)

INSERT INTO public.subscriber (full_name, email, phone, preference, source, status)
VALUES 
    ('María González', 'maria.test@example.com', '5512345678', 'presencial', 'test-script', 'nuevo'),
    ('Carlos Ruiz', 'carlos.test@example.com', '5587654321', 'online', 'test-script', 'nuevo'),
    ('Ana López', 'ana.test@example.com', '5555555555', 'presencial', 'test-script', 'contactado');

-- Verify insertion
SELECT * FROM public.subscriber WHERE source = 'test-script';
