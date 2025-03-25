import { defineStore } from 'pinia';
import { type User } from '@/types';

export const useUserStore = defineStore('users', {
    state: () => ({
        name: '',
        surname: ''
    }),
    
    getters: {
        fullName: (state) => `${state.name} ${state.surname}`,
    },
    
    actions: {
        setUserInfo(user: User) {
            this.name = user.name;
            this.surname = user.surname;
        },
        
        clearUserInfo() {
            this.name = '';
            this.surname = '';
        }
    }
});