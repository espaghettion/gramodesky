import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useOrderStore } from './orderData';

export const useCartStore = defineStore('cartdata', () => {
  const items = ref([]);
  const cost = ref(0);
  const orders = useOrderStore();

  function addToCart(item){
    items.value.push(item);
    let itemCost = 0;
    for(let i = 0; i < items.value.length; i++){
        itemCost += items.value[i].cost;
    }
    console.log(itemCost);
    cost.value = itemCost;
  }

  function createOrder(){
    const order = {
      "user_id": 1,
      "cost": cost.value,
    }
    fetch("http://localhost:3000/orders", {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(order)
    })
  }

  return { items, cost, addToCart, createOrder }
})