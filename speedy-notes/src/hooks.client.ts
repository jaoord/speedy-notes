import { goto } from '$app/navigation';
import { page } from '$app/stores';

export const handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  if (response.status === 401) {
    goto('/login');
  }

  return response;
}; 