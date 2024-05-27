import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGenreStore = defineStore('genredata', () => {
  const genres = ref([]);
  const genre = ref(null);

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

  function addGenre(name){
    const genre = {
      "name": name
    }
    fetch("http://localhost:3000/genres", {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(genre)
    })
  }

  function patchGenre(name, id){
    const genre = {
      "name": name
    }
    fetch("http://localhost:3000/genres/" + (id), {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(genre)
    })
  }

  function deleteGenre(id){
    fetch("http://localhost:3000/genres/" + (id), {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "DELETE",
    })
  }

  return { genres, genre, loadGenres, loadGenre, addGenre, patchGenre, deleteGenre }
})