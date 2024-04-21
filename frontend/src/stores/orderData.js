import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useOrderStore = defineStore('orderdata', () => {
  const orders = ref([]);

  function loadOrders(){
    fetch('http://localhost:3000/orders')
      .then(response => response.json())
      .then(data => orders.value = data)
      .catch(err => console.log(err.message))
  }

  return { orders, loadOrders }
})
