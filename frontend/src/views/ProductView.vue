<script setup>
    import { useCartStore } from '../stores/shoppingCart'
    import { useProductStore } from '../stores/productData'
    import { onMounted } from 'vue';
    import { useRoute } from "vue-router"

    const shoppingCart = useCartStore();
    const productData = useProductStore();
    const route = useRoute();

    onMounted(() => {
        productData.loadProduct(route.params.id)
    })
</script>

<template>
    <div v-if="productData.product">
        <h1>{{ productData.product.name }}</h1>
        <p>{{ productData.product.cost }}Kč</p>
        <button @click="shoppingCart.addToCart(productData.product)">Přidat do košíku</button>
    </div>
</template>

<style scoped>

</style>
