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
  main{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  a{
    width: 100px;
    height: 100px;
    padding: 50px;
    margin: 10px;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: black;
  }
</style>
