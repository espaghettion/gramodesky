import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useArtistStore = defineStore('artistdata', () => {
  const artists = ref([]);
  const artist = ref(null);

  function loadArtists(){
    fetch('http://localhost:3000/artists')
      .then(response => response.json())
      .then(data => artists.value = data)
      .catch(err => console.log(err.message))
  }

  function loadArtist(id){
    fetch('http://localhost:3000/artists/' + (id))
      .then(response => response.json())
      .then(data => artist.value = data)
      .catch(err => console.log(err.message))
  }

  function addArtist(name){
    const artist = {
      "name": name
    }
    fetch("http://localhost:3000/artists", {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(artist)
    })
  }

  function patchArtist(name, id){
    const artist = {
      "name": name
    }
    fetch("http://localhost:3000/artists/" + (id), {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(artist)
    })
  }

  function deleteArtist(id){
    fetch("http://localhost:3000/artists/" + (id), {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "DELETE",
    })
  }

  return { artists, artist, loadArtists, loadArtist, addArtist, patchArtist, deleteArtist }
})