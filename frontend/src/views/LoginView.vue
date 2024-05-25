<script setup>
    import { ref, computed } from 'vue'
    import { useUserStore } from '../stores/userData'

    const userStore = useUserStore();

    const username = ref("");
    const password = ref("");
</script>

<template>
  <div class="login">
    <h1>This is a login page</h1>
    <input v-model="username" type="text" placeholder="username">
    <input v-model="password" type="password" placeholder="password">
    <button @click="userStore.authenticateUser(username, password)">login</button>
    <RouterLink to="/register">Register</RouterLink>
  </div>
</template>

<style>
</style>
