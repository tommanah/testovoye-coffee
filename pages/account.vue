<template>
  <div class="account-container">
    <div class="header">
      <h1>Личный кабинет</h1>
      <div class="user-info">
        <p>Добро пожаловать, {{ userFullName }}</p>
        <button class="logout-btn" @click="handleLogout">Выход</button>
      </div>
    </div>
    
    <div class="content">
      <ProductTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductTable from '@/components/ProductTable.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

definePageMeta({
  middleware: ['auth']
});

const authStore = useAuthStore();
const router = useRouter();
const userFullName = computed(() => authStore.userFullName);

const handleLogout = async () => {
  authStore.logout();
  await router.push('/login');
};
</script>

<style lang="scss" scoped>
.account-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0d6e9;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  
  h1 {
    color: #52405a;
    margin: 0;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
  
  p {
    margin: 0;
    font-weight: 500;
    color: #52405a;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
}

.logout-btn {
  background-color: #ffe6dc;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 600;
  color: #52405a;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
  &:hover {
    background-color: #ffe6dc;
  }
}

.content {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}
</style>