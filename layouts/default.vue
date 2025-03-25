<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
// Явное использование Nuxt API для маршрутизации
import { useRouter, onMounted } from '#imports'

// Функция перенаправления
onMounted(() => {
  const router = useRouter()
  
  // Проверка, что мы на главной странице и выполнение перенаправления
  if (window.location.pathname === '/' || window.location.pathname === '') {
    router.push('/login')
  }
})
</script>