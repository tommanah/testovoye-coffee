import { defineStore } from 'pinia';
import { type User } from '@/types';

export const useAuthStore = defineStore('',{
    state: () => ({
        user: null as User | null,
        loading: false,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
        userFullName: (state) => state.user? `${state.user.name} ${state.user.surname}` : '',
    },
    actions: () => ({
        async fetchUsers() {
            const response = await fetch('/data/users.json');

            if(!response.ok) {
                throw new Error('Ошибка при загрузке пользователей')
            }
            return await response.json() as User[];
        }
    })
});