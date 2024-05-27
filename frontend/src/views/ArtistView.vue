<script setup>
    import { onMounted } from "vue";
    import { useArtistStore } from "@/stores/artistData";
    import { useProductStore } from "@/stores/productData";
    import { useRoute } from "vue-router"

    const artistData = useArtistStore();
    const productData = useProductStore();
    const route = useRoute();

    onMounted(() => {
        artistData.loadArtist(route.params.id);
        productData.loadArtistProducts(route.params.id);
    })
</script>

<template>
    <main v-if="artistData.artist">
        <h2>{{ artistData.artist.name }}</h2>
        <RouterLink v-for="(product, i) in productData.products" :key="i" :to="{name: 'product', params: {id: product.id}}">{{ product.name }}</RouterLink>
    </main>    
</template>

<style lang="scss" scoped>
    @import '../mixins.scss';
    
    a{
        @include block;
    }
</style>