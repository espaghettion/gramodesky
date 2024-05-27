<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <section>
      <img src="./assets/logo.png" id="logo" alt="">
    </section>
    <nav>
      <section>
        <article>
          <RouterLink class="link" to="/">GRAMODESKY.CZ</RouterLink>
        </article>
        <article>
          <RouterLink class="link" to="/user"><i class="fa-regular fa-user"></i></RouterLink>
          <RouterLink class="link" to="/favorites"><i class="fa-regular fa-heart"></i></RouterLink>
          <RouterLink class="link" to="/cart"><i class="fa-solid fa-cart-shopping"></i></RouterLink>
        </article>
      </section>
      <section>
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

</style>
