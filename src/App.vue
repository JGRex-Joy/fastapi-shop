<!-- frontend/src/App.vue -->
<!--
  Корневой компонент приложения.
  Содержит общую структуру с Header и RouterView.
-->

<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Шапка сайта -->
    <Header />

    <!-- Основной контент (роутер) -->
    <RouterView />

    <!-- Футер -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

/**
 * Инициализация приложения
 */
onMounted(() => {
  // Загрузить корзину из localStorage при запуске
  cartStore.initCart()
})
</script>

<style scoped>
/* Убираем все переопределения стилей для #app */
/* Tailwind классы полностью контролируют layout */
</style>
