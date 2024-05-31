<script setup>
    import { useCartStore } from '../stores/shoppingCart'
    import ProductInfo from '../components/ProductInfo.vue'

    const shoppingCart = useCartStore();
</script>

<template>
    <main>
        <h2>Váš košík:</h2>
        <ProductInfo></ProductInfo>
        <h4>Celkem: {{ shoppingCart.price }}Kč</h4>
        <button @click="shoppingCart.createOrder()">Vytvořit objednávku</button>
    </main>
</template>

<style scoped lang="scss">
    @import '../mixins.scss';

    main{
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    button{
        @include button;
    }
</style>
