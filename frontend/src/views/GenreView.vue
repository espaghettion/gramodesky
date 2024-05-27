<script setup>
  import { onMounted } from "vue";
  import { useGenreStore } from "@/stores/genreData";
  import { useProductStore } from "@/stores/productData";
  import { useRoute } from "vue-router"

  const genreData = useGenreStore();
  const productData = useProductStore();
  const route = useRoute();

  onMounted(() => {
    genreData.loadGenre(route.params.id);
    productData.loadGenreProducts(route.params.id);
  })
</script>

<template>
    <main v-if="genreData.genre">
        <h2>{{ genreData.genre.name }}</h2>
        <RouterLink v-for="(product, i) in productData.products" :key="i" :to="{name: 'product', params: {id: product.id}}">{{ product.name }}</RouterLink>
    </main>
</template>

<style lang="scss" scoped>
    @import '../mixins.scss';

    a{
        @include block;
    }
</style>