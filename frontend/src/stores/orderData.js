import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './userData';

export const useOrderStore = defineStore('orderdata', () => {
  const orders = ref([]);

  const userData = useUserStore();
  const token = userData.token;

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
          "Content-Type": "application/json",
          "X-Auth": token
      },
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(order)
    })
  }

  function deleteOrder(id){
    fetch("http://localhost:3000/orders/" + (id), {
      headers: {
          "Content-Type": "application/json",
          "X-Auth": token
      },
      mode: "cors",
      method: "DELETE",
    })
  }

  return { orders, loadOrders, patchOrder, deleteOrder }
})
