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
