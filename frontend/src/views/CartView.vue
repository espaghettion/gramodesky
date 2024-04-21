<script setup>
    import { useCartStore } from '../stores/shoppingCart'

    const shoppingCart = useCartStore();
</script>

<template>
    <h1>Váš košík:</h1>
    <p v-for="(item, i) in shoppingCart.items" :key="i">{{ item.name }}: {{ item.cost }}Kč</p>
    <p>Celkem: {{ shoppingCart.cost }}Kč</p>
    <button @click="shoppingCart.createOrder()">Vytvořit objednávku</button>
</template>

<style scoped lang="scss">

</style>
