<script setup>
  import { onMounted } from "vue";
  import { useProductStore } from "@/stores/productData";
  import ProductPreview from '@/components/ProductPreview.vue';

  const productData = useProductStore();

  onMounted(() => {
    productData.loadProducts();
  })
</script>

<template>
  <main>
    <ProductPreview></ProductPreview>
  </main>
</template>

<style lang="scss" scoped>
    @import '../mixins.scss';
    main{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
</style>
