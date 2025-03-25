<template>
    <form @submit.prevent="submitForm">
        <div class="form-field">
            <label for="username" class="form-label">Логин</label>
            <input 
                id="username"
                v-model="username"
                class="form-input password-input"
                placeholder="Например, anonymus@anonymous.com"
                required
            />
        </div>
        <div class="form-field">
            <label for="password" class="form-label">Пароль</label>
            <input 
                id="password"
                type="password"
                v-model="password"
                class="form-input"
                placeholder="*********"
                required
            />
        </div>
        <div v-if="error" class="error-message">
            {{ error }}
        </div>
        <div class="button-container">
            <button
                type="submit"
                class="login-button"
                :disabled="loading"
            >
                <span class="button-text">
                    {{ loading ? 'Загрузка...' : 'Войти' }}
                </span>
            </button>
            <button type="button" class="forgot-password">
                <span class="button-text">Забыли пароль?</span>
            </button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/users';
import { useRouter } from 'vue-router';

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['login']);
const username = ref('');
const password = ref('');
const userStore = useUserStore();
const router = useRouter();

const submitForm = () => {
    emit('login', { 
        username: username.value, 
        password: password.value 
    });
};

const handleLogin = async () => {
    try {
        await userStore.login(username.value, password.value);
        await router.push('/account');
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Произошла ошибка при входе';
    }
};
</script>

<style lang="scss" scoped>
.form-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.form-input {
    border: none;
    border-radius: 15px;
    padding: 10px;
}

.form-label {
    font-size:10px;
    color: #52405a;
    margin-left: 10px;
    margin-bottom: 5px;
    font-weight: bold;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-button {
    border: none;
    border-radius: 15px;
    background-color: #f8f3ff;
    padding: 10px;
    width: 20%;
}

.button-text {
    font-size: 14px;
    font-weight: 600;
    color: #52405a;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.enter {
    color: inherit;
    text-decoration: none;
}

.button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.forgot-password {
    border: none;
    border-radius: 15px;
    background-color: #f8f3ff;
    padding: 10px;
    width: 30%;
}

.error-message {
    color: #ff3860;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
    padding: 5px;
    background-color: rgba(255, 56, 96, 0.1);
    border-radius: 5px;
}
</style>