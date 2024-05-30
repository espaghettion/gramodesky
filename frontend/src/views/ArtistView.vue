<script setup>
    import { onMounted } from "vue";
    import { useArtistStore } from "@/stores/artistData";
    import { useProductStore } from "@/stores/productData";
    import { useRoute } from "vue-router"
    import ProductPreview from '@/components/ProductPreview.vue';

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
            <article>
                <section class="info">
                    <img :src="'http://localhost:3000/uploads/' + artistData.artist.image" alt="">
                    <h2>{{ artistData.artist.name }}</h2>
                    <p class="description">{{ artistData.artist.description }}</p>
                </section>
            </article>
            <article>
                <section class="products">
                    <h3>Produkty</h3>
                    <ProductPreview></ProductPreview>
                </section>
            </article>
    </main>    
</template>

<style lang="scss" scoped>
    @import '../mixins.scss';

    main{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;

        >article{
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;

            >section{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                padding: 30px;
            }

            .info{
                width: 60%;
                
                p{
                    text-align: justify;
                    font-size: 1em;
                    line-height: 1.2em;
                    color: rgb(80, 80, 80);
                }

                img{
                    width: 100%;
                    padding-bottom: 20px;
                }
            }
        }
    }
</style>