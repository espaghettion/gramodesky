<script setup>
    import { ref, computed } from 'vue'
    import { useUserStore } from '../stores/userData'
    import { useProductStore } from '@/stores/productData';
    import { useArtistStore } from '@/stores/artistData';
    import { useGenreStore } from '@/stores/genreData';
    import UpdateProduct from '@/components/updateProduct.vue';
    import UpdateArtist from '@/components/updateArtist.vue';
    import UpdateGenre from '@/components/updateGenre.vue';
    import UpdateOrder from '@/components/updateOrder.vue';

    const userStore = useUserStore();

    const username = ref("");
    const password = ref("");
</script>

<template>
  <div>
    <article v-if="!userStore.isLoggedIn">
      <section class="login">
        <h2>Přihlášení</h2>
        <section>
          <label for="username">Uživatelské jméno</label>
          <input v-model="username" type="text" name="username" id="username" placeholder="Uživatelské jméno">
        </section>
        <section>
          <label for="password">Heslo</label>
          <input v-model="password" name="password" id="password" type="password" placeholder="Heslo">
        </section>
        <button @click="userStore.authenticateUser(username, password)">Přihlásit</button>
        <RouterLink class="link" to="/register">Nemáte účet? Registrujte se zde</RouterLink>
      </section>
    </article>
    <article v-if="userStore.isLoggedIn && userStore.tokenUserId != 1">
      <button @click="userStore.logout()">Odhlásit</button>
    </article>
    <article class="admin" v-if="userStore.tokenUserId == 1">
      <h2>Administrace</h2>
      <section>
        <h3>Produkty</h3>
        <UpdateProduct></UpdateProduct>
      </section>
      <section>
        <h3>Umělci</h3>
        <UpdateArtist></UpdateArtist>
      </section>
      <section>
        <h3>Žánry</h3>
        <UpdateGenre></UpdateGenre>
      </section>
      <section>
        <h3>Objednávky</h3>
        <UpdateOrder></UpdateOrder>
      </section>
      <section>
        <button @click="userStore.logout()">Odhlásit</button>
      </section>
    </article>
  </div>
</template>

<style lang="scss" scoped>
  @import '../mixins.scss';
  article{
    width: 100%;
    @include flex-row;
    align-items: start;

    &.admin{
      flex-direction: column;
      align-items: center;

      >section{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-top: 3px solid green;
        padding-bottom: 20px;
        padding-top: 20px;
      }
    }

    .login{
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

    button{
          @include button;
        }
  }
</style>
