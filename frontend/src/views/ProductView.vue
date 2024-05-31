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
        <article class="info">
            <section class="description">
                <h2>{{ productData.product.name }}</h2>
            </section>
            <section class="description">
                <p>{{ productData.product.description }}</p>
            </section>
            <section class="artists">
                <p>Interpreti:</p>
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
            <section>
                <p v-if="productData.product.available" class="available">Dostupné</p>
                <p v-else class="unavailable">Nedostupné</p>
            </section>
            <button :disabled="!productData.product.available" @click="shoppingCart.addToCart(productData.product)">Přidat do košíku</button>
        </article>
    </main>
</template>

<style lang="scss" scoped>
    @import '../mixins.scss';

    main{
        @include responsive(smartphone-portrait){
            flex-direction: column;

            h2{
                font-size: 2em;
            }
        }

        @include responsive(smartphone-landscape){
            flex-direction: column;
        }

        @include responsive(tablet){
            flex-direction: column;
        }

        >article{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 50%;
            box-sizing: border-box;
            gap: 20px;
            padding: 20px;

            @include responsive(smartphone-portrait){
                width: 100%;
                align-items: center;
            }

            @include responsive(smartphone-landscape){
                width: 100%;
                align-items: center;
            }

            @include responsive(tablet){
                width: 100%;
                align-items: center;
            }
            

            &.info{
                .description{
                    display: flex;
                    justify-content: space-between;
                    width: 80%;

                    p{
                        font-size: 0.9em;
                        color: rgb(80, 80, 80);
                    }
                }

                .favorite{
                    border: none;
                    font-size: 2em;
                    background-color: rgb(235, 255, 235);

                    &:hover{
                        background-color: rgb(235, 255, 235);
                        color: green;
                    }
                }

                .available{
                    background-color: green;
                    font-weight: 600;
                    color: white;
                    padding: 10px;
                }

                .unavailable{
                    background-color: red;
                    font-weight: 600;
                    color: white;
                    padding: 10px;
                }
            }

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
        font-size: 2.5em;
        padding: 0;
    }

    a, p{
        font-size: 1.2em;
    }

    .artists, .genres{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;

        @include responsive(smartphone-portrait){
            font-size: 0.8em;
        }
    }

    button{
        @include button;
    }
</style>
