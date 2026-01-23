import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cartAPI } from '@/services/api'

const CART_STORAGE_KEY = 'shopping_cart'

export const useCartStore = defineStore('cart', () => {
  // State - храним корзину как объект {product_id: quantity}
  const cartItems = ref({})
  const cartDetails = ref(null)
  const loading = ref(false)

  // Getters
  const itemsCount = computed(() => {
    return Object.values(cartItems.value).reduce((sum, qty) => sum + qty, 0)
  })

  const totalPrice = computed(() => {
    return cartDetails.value?.total || 0
  })

  const hasItems = computed(() => {
    return Object.keys(cartItems.value).length > 0
  })


  function initCart() {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        cartItems.value = JSON.parse(savedCart)
        fetchCartDetails()
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e)
        cartItems.value = {}
      }
    }
  }

  function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value))
  }

  /**
   * Добавить товар в корзину
   */
  async function addToCart(productId, quantity = 1) {
    try {
      loading.value = true

      // Формат данных согласно вашему backend API
      const requestData = {
        product_id: productId,
        quantity: quantity,
        cart: { ...cartItems.value } // Передаем копию текущей корзины
      }

      console.log('Adding to cart:', requestData)

      const response = await cartAPI.addItem(requestData)

      console.log('Cart response:', response.data)

      // Backend возвращает { cart: {...} }
      if (response.data && response.data.cart) {
        cartItems.value = response.data.cart
        saveCart()
        await fetchCartDetails()
        return true
      }

      return false
    } catch (err) {
      console.error('Error adding to cart:', err)
      console.error('Error details:', err.response?.data)
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Получить детальную информацию о корзине
   */
  async function fetchCartDetails() {
    if (!hasItems.value) {
      cartDetails.value = { items: [], total: 0, items_count: 0 }
      return
    }

    loading.value = true
    try {
      // Backend ожидает корзину в теле POST запроса
      const response = await cartAPI.getCart(cartItems.value)
      cartDetails.value = response.data
    } catch (err) {
      console.error('Error fetching cart details:', err)
      console.error('Error details:', err.response?.data)
    } finally {
      loading.value = false
    }
  }

  /**
   * Обновить количество товара
   */
  async function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      return removeFromCart(productId)
    }

    try {
      loading.value = true

      const requestData = {
        product_id: productId,
        quantity: quantity,
        cart: cartItems.value
      }

      const response = await cartAPI.updateItem(requestData)

      if (response.data && response.data.cart) {
        cartItems.value = response.data.cart
        saveCart()
        await fetchCartDetails()
        return true
      }

      return false
    } catch (err) {
      console.error('Error updating cart:', err)
      console.error('Error details:', err.response?.data)
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Удалить товар из корзины
   */
  async function removeFromCart(productId) {
    try {
      loading.value = true

      const requestData = {
        cart: cartItems.value
      }

      const response = await cartAPI.removeItem(productId, requestData)

      if (response.data && response.data.cart) {
        cartItems.value = response.data.cart
        saveCart()
        await fetchCartDetails()
        return true
      }

      return false
    } catch (err) {
      console.error('Error removing from cart:', err)
      console.error('Error details:', err.response?.data)
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Очистить корзину
   */
  function clearCart() {
    cartItems.value = {}
    cartDetails.value = null
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  return {
    // State
    cartItems,
    cartDetails,
    loading,
    // Getters
    itemsCount,
    totalPrice,
    hasItems,
    // Actions
    initCart,
    addToCart,
    fetchCartDetails,
    updateQuantity,
    removeFromCart,
    clearCart,
  }
})
