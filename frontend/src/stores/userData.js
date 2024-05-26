import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import jwt from 'jsonwebtoken';

export const useUserStore = defineStore('userdata', () => {
  const users = ref([]);


  let token = ref(localStorage.getItem("token"));
  const tokenUserId = computed(() => {
    console.log(jwt.decode(token.value));
    if(token.value === undefined || token.value === null){
      return -1;
    }
    else return jwt.decode(token.value).id;
  })

  watch(token, () => {
    if(token.value === undefined) {
      localStorage.removeItem("token")
    } else {
      localStorage.setItem("token", token.value);
    }
  });
  
  const isLoggedIn = computed(() => {
    return token.value !== undefined && token.value !== "undefined" && token.value !== null;
  });

  const logout = () => {
    token.value = undefined;
  };


  function loadUsers(){
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => users.value = data)
      .catch(err => console.log(err.message))
  }

  function loadUser(id){
    fetch('http://localhost:3000/users/' + (id))
      .then(response => response.json())
      .then(data => users.value = data)
      .catch(err => console.log(err.message))
  }

  function addUser(name, username, password){
    const user = {
      "name": name,
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

  async function authenticateUser(username, password){
    token.value = undefined;

    const user = {
      "username": username,
      "password": password
    }
    
    const response = await fetch("http://localhost:3000/users/login", {
      headers: {
          "Content-Type": "application/json"
      },
      mode: "cors",
      method: "POST",
      body: JSON.stringify(user)
    })

    const json = await response.json();

    token.value = json.token;
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

  return { users, token, tokenUserId, isLoggedIn, logout, loadUsers, loadUser, addUser, authenticateUser, patchUser }
})
