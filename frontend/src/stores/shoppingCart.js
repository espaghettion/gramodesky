import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useOrderStore } from './orderData';
import { useUserStore } from './userData';

export const useCartStore = defineStore('cartdata', () => {
  const items = ref([]);
  const price = ref(0);

  const orders = useOrderStore();
  const user = useUserStore();

  const token = user.token;

  function addToCart(item){
    items.value.push(item);
    let itemPrice = 0;
    for(let i = 0; i < items.value.length; i++){
        itemPrice += items.value[i].price;
    }
    price.value = itemPrice;
  }

  async function createOrder(){
    const order = {
      "user_id": user.tokenUserId,
      "price": price.value,
      "items": items.value
    }
    await fetch("http://localhost:3000/orders", {
      headers: {
          "Content-Type": "application/json",
          "X-Auth": token
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(order)
    })

    items.value = [];
    price.value = 0;
  }

  return { items, price, addToCart, createOrder }
}, {persist: { storage: localStorage }})