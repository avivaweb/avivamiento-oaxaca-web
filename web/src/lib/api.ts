import Cookies from 'js-cookie';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = Cookies.get('auth_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expirado o inválido
    Cookies.remove('auth_token');
    window.location.href = '/login';
    throw new Error('Sesión expirada');
  }

  return response;
}