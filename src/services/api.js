import axios from 'axios'

const API_BASE_URL = 'https://fastapi-shop-v4fl.onrender.com'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

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

export const productsAPI = {
  getAll() {
    return apiClient.get('/api/products')
  },


  getById(id) {
    return apiClient.get(`/api/products/${id}`)
  },

  getByCategory(categoryId) {
    return apiClient.get(`/api/products/category/${categoryId}`)
  },
}


export const categoriesAPI = {
  getAll() {
    return apiClient.get('/api/categories')
  },

  getById(id) {
    return apiClient.get(`/api/categories/${id}`)
  },
}


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
   * @param {Object} cartData
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
