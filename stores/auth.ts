import { defineStore } from 'pinia';
import { type User } from '@/types';

interface AuthState {
    user: User | null;
    loading: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        loading: false,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
        userFullName: (state) => state.user? `${state.user.name} ${state.user.surname}` : '',
    },
    actions: {
        async fetchUsers() {
            const response = await fetch('/data/users.json');

            if(!response.ok) {
                throw new Error('Ошибка при загрузке пользователей')
            }
            return await response.json() as User[];
        },
        async login(username: string, password: string) {
            this.loading = true;
            try {
                const users = await this.fetchUsers();

                const foundUser = users.find(
                    user => user.credentials.username === username 
                )

                if(!foundUser) {
                    throw new Error('Sorry bro, но пользователь не найден')
                }

                if(!foundUser.active) {
                    throw new Error('Sorry bro, но пользователь уже не активен')
                }

                const passwordMatch = foundUser._comment?.match(/паролем '([^']+)'/)
                const actualpassword = passwordMatch ? passwordMatch[1] : null;

                if(!actualpassword || actualpassword !== password) {
                    throw new Error('Sorry bro, но пароль неверный')
                }
                this.user = foundUser;
                
                localStorage.setItem('auth_user', JSON.stringify(foundUser));
                
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }
        },
        
        checkAuth() {
            const savedUser = localStorage.getItem('auth_user');
            if (savedUser) {
                this.user = JSON.parse(savedUser);
            }
        },
        
        logout() {
            this.user = null;
            localStorage.removeItem('auth_user');
        }
    },
});

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    
    authStore.checkAuth();
    
    if (!authStore.isAuthenticated && to.path !== '/login') {
        return navigateTo('/login');
    }
    
    if (authStore.isAuthenticated && to.path === '/login') {
        return navigateTo('/account');
    }
});