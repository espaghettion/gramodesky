<script setup>
    import { useCartStore } from '../stores/shoppingCart'
    import { useProductStore } from '../stores/productData'
    import { useArtistStore } from '@/stores/artistData';
    import { useGenreStore } from '@/stores/genreData';
    import { onMounted } from 'vue';
    import { useRoute } from "vue-router"

    const shoppingCart = useCartStore();
    const productData = useProductStore();
    const artistData = useArtistStore();
    const genreData = useGenreStore();
    const route = useRoute();

    onMounted(() => {
        productData.loadProduct(route.params.id);
        genreData.loadProductGenres(route.params.id);
        artistData.loadProductArtists(route.params.id);
    })
</script>

<template>
    <main v-if="productData.product">
        <article class="image">
            <img :src="'http://localhost:3000/uploads/' + productData.product.image" alt="">
        </article>
        <article>
            <h2>{{ productData.product.name }}</h2>
            <section class="artists">
                <p>Umělci:</p>
                <RouterLink  class="link" v-for="(artist, i) in artistData.artists" :key="i" :to="{name: 'artist', params: {id: artist.id}}">{{ artist.name }}</RouterLink>
            </section>
            <section class="genres">
                <p>Žánry:</p>
                <RouterLink class="link" v-for="(genre, i) in genreData.genres" :key="i" :to="{name: 'genre', params: {id: genre.id}}">{{ genre.name }}</RouterLink>
            </section>
            <section>
                    <p>Typ: {{ productData.product.type }}</p>
            </section>
            <section>
                <p>{{ productData.product.price }} Kč</p>
            </section>
            <button @click="shoppingCart.addToCart(productData.product)">Přidat do košíku</button>
        </article>
    </main>
</template>

<style lang="scss" scoped>
    @import '../mixins.scss';

    main{
        align-items: center;

        >article{
            display: flex;
            flex-direction: column;
            align-items: start;
            width: 50%;
            box-sizing: border-box;
            gap: 20px;
            padding: 20px;

            &.image{
                align-items: center;
                justify-content: center;

                img{
                    width: 70%;
                    object-fit: cover;
                }
            }

        }
    }

    h2{
        padding: 0;
    }

    a, p{
        font-size: 1.2em;
    }

    .artists, .genres{
        display: flex;
        flex-direction: row;
        gap: 20px;
    }

    button{
        @include button;
    }
</style>
