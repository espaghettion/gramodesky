<script setup>
  import { useProductStore } from "../stores/productData"

  const productData = useProductStore();
</script>

<template>
  <div>
    <RouterLink v-for="(product, i) in productData.products" :key="i" :to="{name: 'product', params: {id: product.id}}" :style="{ backgroundImage: `url('http://localhost:3000/uploads/${product.image}')`}">
      <div class="overlay">{{ product.name }} - {{ product.type }}</div>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
  @import '../mixins.scss';

  div{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }

  a{
      @include block;
      display: flex;
      position: relative;
      background-size: contain;
      text-align: center;

      @include responsive(smartphone-portrait){
        width: 40px;
        height: 40px;
      }
  }
</style>