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

        @include responsive(smartphone-portrait){
            flex-direction: column;
        }

        @include responsive(smartphone-landscape){
            flex-direction: column;
        }

        @include responsive(tablet){
            flex-direction: column;
        }

        >article{
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;

            @include responsive(smartphone-portrait){
                width: 100%;
            }

            @include responsive(smartphone-landscape){
                width: 100%;
            }

            @include responsive(tablet){
                width: 100%;
            }

            >section{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                padding: 30px;

                @include responsive(smartphone-portrait){
                    width: 100%;
                    padding: 0;
                    padding-top: 30px;
                    padding-bottom: 30px;

                    h2{
                        font-size: 2em;
                    }
                }

                @include responsive(smartphone-landscape){
                    width: 100%;
                    padding: 0;
                    padding-top: 30px;
                    padding-bottom: 30px;
                }

                @include responsive(tablet){
                    width: 100%;
                    padding: 0;
                    padding-top: 30px;
                    padding-bottom: 30px;
                }
            }

            .products{
                img{
                    width: 35px;
                }
            }

            .info{
                width: 60%;

                @include responsive(smartphone-portrait){
                    width: 90%;
                }

                @include responsive(smartphone-landscape){
                    width: 80%;
                }
                
                @include responsive(tablet){
                    width: 80%;
                }
                
                p{
                    text-align: justify;
                    font-size: 1em;
                    line-height: 1.2em;
                    color: rgb(80, 80, 80);
                }

                img{
                    width: 100%;
                    padding-bottom: 20px;

                    @include responsive(smartphone-portrait){
                        width: 60%;
                    }

                    @include responsive(smartphone-landscape){
                        width: 60%;
                    }
                    
                    @include responsive(tablet){
                        width: 60%;
                    }
                }
            }
        }
    }
</style>