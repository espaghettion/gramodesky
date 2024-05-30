<script setup>
    import { useCartStore } from '../stores/shoppingCart'

    const shoppingCart = useCartStore();
</script>

<template>
    <div>
        <article v-for="(item, i) in shoppingCart.items" :key="i">
            <section>
                <img :src="'http://localhost:3000/uploads/' + item.image" alt="">
            </section>
            <section class="info">
                <p>{{ item.name }} - {{ item.type }}</p>
                <p>{{ item.price }} Kč</p>
            </section>
        </article>
    </div>
</template>

<style lang="scss" scoped>
        div{
            width: 50%;
        }

        article{
            display: flex;
            border: 3px solid green;
            padding: 5px;
            width: 100%;
            align-items: center;

            img{
                width: 100px;
            }

            .info{
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding: 20px;

                p{
                    font-size: 1.2em;
                    color: green;
                    font-weight: 600;
                }
            }


        }
</style>