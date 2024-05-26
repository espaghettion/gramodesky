<script setup>
    import { ref, computed } from 'vue'
    import { useUserStore } from '../stores/userData'

    const userStore = useUserStore();

    const name = ref("");
    const username = ref("");
    const password = ref("");
</script>


<template>
    <div>
      <section class="register">
        <h2>Registrace</h2>
        <section>
          <label for="name">Jméno</label>
          <input v-model="name" type="text" name="name" id="name" placeholder="Jméno">
        </section>
        <section>
          <label for="username">Uživatelské jméno</label>
          <input v-model="username" type="text" name="username" id="username" placeholder="Uživatelské jméno">
        </section>
        <section>
          <label for="password">Heslo</label>
          <input v-model="password" name="password" id="password" type="password" placeholder="Heslo">
        </section>
        <RouterLink class="button" @click="userStore.addUser(name, username, password)" to="/user">Registrovat</RouterLink>
      </section>
    </div>
</template>
  
<style lang="scss" scoped>
@import '../mixins.scss';

    .register{
      width: 100%;
      @include flex-column;
      justify-content: start;
      gap: 20px;

      section{
        @include flex-column;
        gap: 5px;
      }

      .link{
        font-family: "Lato", sans-serif;
        text-decoration: none;
        color: black;
        transition: 0.3s ease all;

        &:hover{
          color: green;
        }
      }
    }

    .button{
      @include button;
      text-decoration: none;
      padding: 5px;
    }
</style>