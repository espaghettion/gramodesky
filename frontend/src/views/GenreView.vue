<script setup>
  import { onMounted } from "vue";
  import { useGenreStore } from "@/stores/genreData";
  import { useProductStore } from "@/stores/productData";
  import { useRoute } from "vue-router"
  import ProductPreview from '@/components/ProductPreview.vue';

  const genreData = useGenreStore();
  const productData = useProductStore();
  const route = useRoute();

  onMounted(() => {
    genreData.loadGenre(route.params.id);
    productData.loadGenreProducts(route.params.id);
  })
</script>

<template>
    <main v-if="genreData.genre">
            <article>
                <section class="info">
                    <h2>{{ genreData.genre.name }}</h2>
                    <p class="description">{{ genreData.genre.description }}</p>
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
                padding: 30px;

                @include responsive(smartphone-portrait){
                    width: 100%;
                    padding: 0;
                    padding-top: 30px;
                    padding-bottom: 30px;
                }

                @include responsive(smartphone-landscape){
                    width: 90%;
                    padding: 0;
                    padding-top: 30px;
                    padding-bottom: 30px;
                }

                @include responsive(tablet){
                    width: 90%;
                    padding: 0;
                    padding-top: 30px;
                    padding-bottom: 30px;
                }
            }

            .info{
                width: 60%;
                display: flex;
                flex-direction: column;
                gap: 20px;

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
                    font-size: 1.3em;
                    line-height: 1.5em;
                    color: rgb(80, 80, 80);
                }
            }
        }
    }
</style>