// frontend/src/services/api.js
/**
 * API сервис для взаимодействия с backend.
 * Централизует все HTTP запросы к FastAPI серверу.
 * Использует axios для выполнения запросов.
 */

import axios from 'axios'

// Базовый URL API из переменных окружения или значение по умолчанию
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// Создаем экземпляр axios с настройками по умолчанию
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Добавляем interceptor для логирования (поможет в отладке)
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    })
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    })
    return Promise.reject(error)
  },
)

/**
 * API методы для работы с товарами
 */
export const productsAPI = {
  /**
   * Получить все товары
   */
  getAll() {
    return apiClient.get('/api/products')
  },

  /**
   * Получить товар по ID
   */
  getById(id) {
    return apiClient.get(`/api/products/${id}`)
  },

  /**
   * Получить товары по категории
   */
  getByCategory(categoryId) {
    return apiClient.get(`/api/products/category/${categoryId}`)
  },
}

/**
 * API методы для работы с категориями
 */
export const categoriesAPI = {
  /**
   * Получить все категории
   */
  getAll() {
    return apiClient.get('/api/categories')
  },

  /**
   * Получить категорию по ID
   */
  getById(id) {
    return apiClient.get(`/api/categories/${id}`)
  },
}

/**
 * API методы для работы с корзиной
 */
export const cartAPI = {
  /**
   * Добавить товар в корзину
   */
  addItem(item, cartData) {
    return apiClient.post('/api/cart/add', {
      product_id: item.product_id,
      quantity: item.quantity,
      cart: cartData,
    })
  },

  /**
   * Получить содержимое корзины
   */
  getCart(cartData) {
    return apiClient.post('/api/cart', cartData)
  },

  /**
   * Обновить количество товара
   * ИСПРАВЛЕНО: Точное соответствие бэкенду
   */
  updateItem(item, cartData) {
    return apiClient.put('/api/cart/update', {
      product_id: item.product_id,
      quantity: item.quantity,
      cart: cartData,
    })
  },

  /**
   * Удалить товар из корзины
   */
  removeItem(productId, cartData) {
    return apiClient.delete(`/api/cart/remove/${productId}`, {
      data: {
        cart: cartData,
      },
    })
  },
}

export default apiClient
