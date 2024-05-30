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
                display: flex;
                flex-direction: column;
                gap: 20px;
                
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