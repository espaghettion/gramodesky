<script setup>
  import { onMounted } from "vue";
  import { useProductStore } from "../stores/productData"

  const productData = useProductStore();

  onMounted(() => {
    productData.loadProducts();
  })
</script>

<template>
  <main>
    <RouterLink v-for="(product, i) in productData.products" :key="i" :to="{name: 'product', params: {id: product.id}}" :style="{ backgroundImage: `url('http://localhost:3000/uploads/${product.image}')`}"></RouterLink>
  </main>
</template>

<style scoped lang="scss">
  @import '../mixins.scss';

  a{
    @include block;
  }
</style>
