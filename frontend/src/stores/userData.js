import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userdata', () => {
  const users = ref([]);

  function loadUsers(){
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => users.value = data)
      .catch(err => console.log(err.message))
  }

  function loadUser(){
    fetch('http://localhost:3000/users/' + (id))
      .then(response => response.json())
      .then(data => users.value = data)
      .catch(err => console.log(err.message))
  }

  function addUser(username, password){
    const user = {
      "username": username,
      "password": password
    }
    fetch("http://localhost:3000/users", {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(user)
    })
  }

  function authenticateUser(username, password){
    const user = {
      "username": username,
      "password": password
    }
    fetch("http://localhost:3000/users/login", {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(user)
    })
  }

  function patchUser(username, id){
    const user = {
      "username": username,
    }
    fetch("http://localhost:3000/users/" + (id), {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(user)
    })
  }

  return { users, loadUsers, loadUser, addUser, authenticateUser, patchUser }
})
