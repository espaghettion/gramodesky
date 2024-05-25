<script setup>
    import { ref, computed } from 'vue'
    import { useUserStore } from '../stores/userData'

    const userStore = useUserStore();

    const username = ref("");
    const password = ref("");
</script>


<template>
    <div class="register">
      <h1>This is a register page</h1>
      <input v-model="username" type="text" placeholder="username">
      <input v-model="password" type="password" placeholder="password">
      <button @click="userStore.addUser(username, password)">register</button>
    </div>
</template>
  
<style lang="scss" scoped>

</style>