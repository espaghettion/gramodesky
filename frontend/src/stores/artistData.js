import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './userData';

export const useArtistStore = defineStore('artistdata', () => {
  const artists = ref([]);
  const artist = ref(null);

  const userData = useUserStore();
  const token = userData.token;

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

  async function addArtist(name, description, image){
    const artist = {
      "name": name,
      "description": description
    }

    const file = new FormData();
    file.append("file", image);

    const response = await fetch("http://localhost:3000/artists", {
      headers: {
          "Content-Type": "application/json",
          "X-Auth": token
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(artist)
    }).then((a) => a.json())

    await fetch("http://localhost:3000/artists/" + response.id + "/image",  {
      headers: {
        "X-Auth": token
      },
      mode: "cors",
      method: "PATCH",
      body: file
    })

    loadArtists();
  }

  async function patchArtist(name, description, id){
    const artist = {
      "name": name,
      "description": description
    }
    await fetch("http://localhost:3000/artists/" + (id), {
      headers: {
          "Content-Type": "application/json",
          "X-Auth": token
      },
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(artist)
    })

    loadArtists();
  }

  async function deleteArtist(id){
    await fetch("http://localhost:3000/artists/" + (id), {
      headers: {
          "Content-Type": "application/json",
          "X-Auth": token
      },
      mode: "cors",
      method: "DELETE",
    })

    loadArtists();
  }

  return { artists, artist, loadArtists, loadArtist, loadProductArtists, addArtist, patchArtist, deleteArtist }
})