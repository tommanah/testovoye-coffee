<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
import { useRouter, onMounted } from '#imports'

onMounted(() => {
  const router = useRouter()
  
  if (window.location.pathname === '/' || window.location.pathname === '') {
    router.push('/login')
  }
})
</script>