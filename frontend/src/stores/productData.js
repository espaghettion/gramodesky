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

  function addProduct(name, artists, genres, available, price, type){
    const product = {
      "name": name,
      "artists": artists,
      "genres": genres,
      "available": available,
      "price": price,
      "type": type
    }
    fetch("http://localhost:3000/products", {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(product)
    })
  }

  function patchProduct(name, available, price, id){
    const product = {
      "name": name,
      "available": available,
      "price": price
    }
    fetch("http://localhost:3000/products/" + (id), {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(product)
    })
  }

  function deleteProduct(id){
    fetch("http://localhost:3000/products/" + (id), {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "DELETE"
    })
  }


  return { products, product, loadProducts, loadProduct, addProduct, patchProduct, deleteProduct }
})