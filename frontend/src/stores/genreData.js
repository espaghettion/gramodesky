import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGenreStore = defineStore('genredata', () => {
  const genres = ref([]);

  function loadGenres(){
    fetch('http://localhost:3000/genres')
      .then(response => response.json())
      .then(data => genres.value = data)
      .catch(err => console.log(err.message))
  }

  return { genres, loadGenres }
})