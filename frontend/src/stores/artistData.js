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

  function loadProductArtists(id){
    fetch('http://localhost:3000/products/' + (id) + '/artists')
      .then(response => response.json())
      .then(data => artists.value = data)
      .catch(err => console.log(err.message))
  }

  async function addArtist(name, image){
    const artist = {
      "name": name
    }

    const file = new FormData();
    file.append("file", image);

    const response = await fetch("http://localhost:3000/artists", {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(artist)
    }).then((a) => a.json())

    await fetch("http://localhost:3000/artists/" + response.id + "/image",  {
      headers: {
      },
      mode: "cors",
      method: "PATCH",
      body: file
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

  return { artists, artist, loadArtists, loadArtist, loadProductArtists, addArtist, patchArtist, deleteArtist }
})