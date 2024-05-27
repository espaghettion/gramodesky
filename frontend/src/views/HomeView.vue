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
    <RouterLink v-for="(product, i) in productData.products" :key="i" :to="{name: 'product', params: {id: product.id}}">{{ product.name }}</RouterLink>
  </main>
</template>

<style scoped lang="scss">
  @import '../mixins.scss';

  main{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  a{
    @include block;
  }
</style>
