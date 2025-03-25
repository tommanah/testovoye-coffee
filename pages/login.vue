<template>
  <div class="login-container">
    <h1 class="">Добро пожаловать в приложение!!!</h1>
    <LoginForm 
      :loading="loading" 
      :error="error"
      @login="handleLogin"
    />
  </div>
</template> 

<script setup>
import LoginForm from '../components/LoginForm.vue';
const username = ref('');
const password = ref('');
const loading = ref(false);

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