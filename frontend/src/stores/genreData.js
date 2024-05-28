import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './userData';

export const useGenreStore = defineStore('genredata', () => {
  const genres = ref([]);
  const genre = ref(null);

  const userData = useUserStore();
  const token = userData.token;

  function loadGenres(){
    fetch('http://localhost:3000/genres')
      .then(response => response.json())
      .then(data => genres.value = data)
      .catch(err => console.log(err.message))
  }

  function loadGenre(id){
    fetch('http://localhost:3000/genres/' + (id))
      .then(response => response.json())
      .then(data => genre.value = data)
      .catch(err => console.log(err.message))
  }

  function loadProductGenres(id){
    fetch('http://localhost:3000/products/' + (id) + '/genres')
      .then(response => response.json())
      .then(data => genres.value = data)
      .catch(err => console.log(err.message))
  }

  async function addGenre(name, description){
    const genre = {
      "name": name,
      "description": description
    }
    await fetch("http://localhost:3000/genres", {
      headers: {
          "Content-Type": "application/json",
          "X-Auth": token
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(genre)
    })

    loadGenres();
  }

  async function patchGenre(name, description, id){
    const genre = {
      "name": name,
      "description": description
    }
    await fetch("http://localhost:3000/genres/" + (id), {
      headers: {
          "Content-Type": "application/json",
          "X-Auth": token
      },
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(genre)
    })

    loadGenres();
  }

  async function deleteGenre(id){
    await fetch("http://localhost:3000/genres/" + (id), {
      headers: {
          "Content-Type": "application/json",
          "X-Auth": token
      },
      mode: "cors",
      method: "DELETE",
    })

    loadGenres();
  }

  return { genres, genre, loadGenres, loadGenre, loadProductGenres, addGenre, patchGenre, deleteGenre }
})