<template>
  <div class="login-container">
    <h1 class="">Система управления заказами</h1>
    <LoginForm 
      :loading="loading" 
      :error="error"
      @login="handleLogin"
    />
  </div>
</template> 

<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async (formData: { username: string, password: string }) => {
  loading.value = true;
  error.value = '';
  
  try {
    await authStore.login(formData.username, formData.password);
    await router.push('/account');
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Введены неверные данные авторизации. Попробуйте ещё раз';
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.login-container {
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 500px;
    max-height: 500px;
    background-color: #ffe6dc;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
}


</style>