import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  
  // Проверяем сохраненную сессию при каждом переходе
  authStore.checkAuth();
  
  // Если пользователь не авторизован и пытается зайти не на страницу входа
  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login');
  }
  
  // Если пользователь авторизован и пытается зайти на страницу входа
  if (authStore.isAuthenticated && to.path === '/login') {
    return navigateTo('/account');
  }
}); 