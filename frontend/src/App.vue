<script setup>
  import { ref } from 'vue';
  import { RouterLink, RouterView } from 'vue-router'

  const isOpen = ref(false);

  function openMenu(){
    isOpen.value = !isOpen.value;
  }
</script>

<template>
  <header>
    <section class="responsive">
      <img src="./assets/logo.png" id="logo" alt="">
      <button class="menu" @click="openMenu()"><i class="fa-solid fa-bars"></i></button>
    </section>
    <nav :class="{ active: isOpen }">
      <section class="links">
        <article>
          <RouterLink class="link name" to="/">GRAMODESKY.CZ</RouterLink>
        </article>
        <article>
          <RouterLink class="link" to="/user"><i class="fa-regular fa-user"></i></RouterLink>
          <RouterLink class="link" to="/cart"><i class="fa-solid fa-cart-shopping"></i></RouterLink>
        </article>
      </section>
      <section class="categories">
        <ul id="categories">
          <li><RouterLink class="link" to="/">ALBA</RouterLink></li>
          <li><RouterLink class="link" to="/artists">INTERPRETI</RouterLink></li>
          <li><RouterLink class="link" to="/genres">ŽÁNRY</RouterLink></li>
        </ul>
      </section>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
  @import './mixins.scss';

  header{
    .active{
      display: flex;
    }

    .menu{
      display: none;
      border: none;
      background-color: transparent;
      font-weight: 600;
      font-size: 2em;
    }

    .responsive{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    @include responsive(smartphone-portrait){
      flex-direction: column;
      align-items: center;

      nav{
        display: none;
        width: 80%;
      }

      .name{
        display: none;
      }

      .responsive{
        width: 100%;
      }

      .menu{
          height: 100%;
          display: flex;
      }

      .links, .categories{
        flex-direction: column;
        width: 100%;
      }

      #categories{
        width: 100%;
        gap: 10px;
      }
    }

    @include responsive(smartphone-landscape){
      gap: 20px;
      nav{
        justify-content: space-between;
      }
    }
  }
</style>
