import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './userData';

export const useProductStore = defineStore('productdata', () => {
  const products = ref([]);
  const product = ref(null);

  const userData = useUserStore();
  const token = userData.token;

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

  function loadGenreProducts(id){
    fetch('http://localhost:3000/genres/' + (id) + '/products')
      .then(response => response.json())
      .then(data => products.value = data)
      .catch(err => console.log(err.message))
  }

  function loadArtistProducts(id){
    fetch('http://localhost:3000/artists/' + (id) + '/products')
      .then(response => response.json())
      .then(data => products.value = data)
      .catch(err => console.log(err.message))
  }

  async function addProduct(name, artists, genres, description, available, price, type, image){
    const product = {
      "name": name,
      "artists": artists,
      "genres": genres,
      "description": description,
      "available": available,
      "price": price,
      "type": type
    }

    const file = new FormData();
    file.append("file", image);

    const response = await fetch("http://localhost:3000/products", {
      headers: {
          "Content-Type": "application/json",
          "X-Auth": token
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(product)
    }).then((a) => a.json())
    
    await fetch("http://localhost:3000/products/" + response.id + "/image",  {
      headers: {
        "X-Auth": token
      },
      mode: "cors",
      method: "PATCH",
      body: file
    })

    loadProducts();
  }

  async function patchProduct(name, description, available, price, id){
    const product = {
      "name": name,
      "description": description,
      "available": available,
      "price": price
    }
    await fetch("http://localhost:3000/products/" + (id), {
      headers: {
          "Content-Type": "application/json",
          "X-Auth": token
      },
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(product)
    })

    loadProducts();
  }

  async function deleteProduct(id){
    await fetch("http://localhost:3000/products/" + (id), {
      headers: {
          "Content-Type": "application/json",
          "X-Auth": token
      },
      mode: "cors",
      method: "DELETE"
    })

    loadProducts();
  }


  return { products, product, loadProducts, loadProduct, loadGenreProducts, loadArtistProducts, addProduct, patchProduct, deleteProduct }
})