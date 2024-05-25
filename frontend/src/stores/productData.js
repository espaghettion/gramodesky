import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('productdata', () => {
  const products = ref([]);
  const product = ref(null);

  function loadProducts(){
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => products.value = data)
      .catch(err => console.log(err.message))
  }
  function loadProduct(id){
    fetch('http://localhost:3000/products/' + (id))
      .then(response => response.json())
      .then(data => product.value = data)
      .catch(err => console.log(err.message))
  }
  /*function createProduct(){
    const product = {
    }
    fetch("http://localhost:3000/products", {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(product)
    })
  }*/


  return { products, product, loadProducts, loadProduct }
})