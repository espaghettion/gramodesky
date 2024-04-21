import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useArtistStore = defineStore('artistdata', () => {
  const artists = ref([]);

  function loadArtists(){
    fetch('http://localhost:3000/artists')
      .then(response => response.json())
      .then(data => artists.value = data)
      .catch(err => console.log(err.message))
  }

  return { artists, loadArtists }
})