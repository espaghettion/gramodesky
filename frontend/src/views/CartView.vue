<script setup>
    import { useCartStore } from '../stores/shoppingCart'

    const shoppingCart = useCartStore();
</script>

<template>
    <div>
        <h1>Váš košík:</h1>
        <p v-for="(item, i) in shoppingCart.items" :key="i">{{ item.name }}: {{ item.price }}Kč</p>
        <p>Celkem: {{ shoppingCart.price }}Kč</p>
        <button @click="shoppingCart.createOrder()">Vytvořit objednávku</button>
    </div>
</template>

<style scoped lang="scss">

</style>
