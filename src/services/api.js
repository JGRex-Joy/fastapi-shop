// frontend/src/services/api.js
/**
 * API сервис для взаимодействия с backend.
 * Централизует все HTTP запросы к FastAPI серверу.
 * Использует axios для выполнения запросов.
 */

import axios from 'axios'

// Базовый URL API из переменных окружения или значение по умолчанию
const API_BASE_URL = 'https://fastapi-shop-lviw.onrender.com/api'

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
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    })
    return response
  },
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
   * @param {Object} requestData - Объект с product_id, quantity и cart
   */
  addItem(requestData) {
    return apiClient.post('/api/cart/add', requestData)
  },

  /**
   * Получить содержимое корзины
   * @param {Object} cartData - Объект корзины {product_id: quantity}
   */
  getCart(cartData) {
    return apiClient.post('/api/cart', cartData)
  },

  /**
   * Обновить количество товара
   * @param {Object} requestData - Объект с product_id, quantity и cart
   */
  updateItem(requestData) {
    return apiClient.put('/api/cart/update', requestData)
  },

  /**
   * Удалить товар из корзины
   * @param {number} productId - ID товара для удаления
   * @param {Object} requestData - Объект с cart
   */
  removeItem(productId, requestData) {
    return apiClient.delete(`/api/cart/remove/${productId}`, {
      data: requestData,
    })
  },
}

export default apiClient
