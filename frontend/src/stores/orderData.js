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

  function patchOrder(state, id){
    const order = {
      "state": state
    }
    fetch("http://localhost:3000/orders/" + (id), {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(order)
    })
  }

  function deleteOrder(id){
    fetch("http://localhost:3000/orders/" + (id), {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "DELETE",
    })
  }

  return { orders, loadOrders, patchOrder, deleteOrder }
})
