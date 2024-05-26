<script setup>
    import { useProductStore } from "../stores/productData";
    import { useArtistStore } from "@/stores/artistData";
    import { useGenreStore } from "@/stores/genreData";
    import { ref } from "vue";

    const productStore = useProductStore();
    const artistStore = useArtistStore();
    const genreStore = useGenreStore();

    productStore.loadProducts();
    const products = productStore.products;

    artistStore.loadArtists();
    const artists = artistStore.artists;

    genreStore.loadGenres();
    const genres = genreStore.genres;

    const name = ref("");
    const productArtists = ref([]);
    const productGenres = ref([]);
    const available = ref(false);
    const price = ref();
    const type = ref();

    const patchProductId = ref();
    const newName = ref("");
    const changeAvailable = ref(false);
    const newPrice = ref();

    const deleteProductId = ref();
</script>

<template>
    <article>
        <section>
            <h4>Přidat produkt</h4>
            <article class="property">
                <label for="product-name">Jméno</label>
                <input v-model="name" type="text" name="product-name" id="product-name" placeholder="Jméno produktu">
            </article>
            <article class="property">
                <label for="artists">Umělci</label>
                <select v-model="productArtists" name="artists" id="artists" multiple>
                    <option v-for="(artist, i) in artistStore.artists" :key="i" :value="artist.id">{{ artist.name }}</option>
                </select>
            </article>
            <article class="property">
                <label for="genres">Žánry</label>
                <select v-model="productGenres" name="genres" id="genres" multiple>
                    <option v-for="(genre, i) in genreStore.genres" :key="i" :value="genre.id">{{ genre.name }}</option>
                </select>
            </article>
            <article class="property">
                <label for="available">Dostupný</label>
                <input v-model="available" type="checkbox" name="available" id="available">
            </article>
            <article class="property">
                <label for="price">Cena</label>
                <input v-model="price" type="number" name="price" id="price" placeholder="Cena produktu">
            </article>
            <article class="property">
                <label for="type">Typ</label>
                <select v-model="type" name="type" id="type">
                    <option value="Vinyl">Vinyl</option>
                    <option value="CD">CD</option>
                </select>
            </article>
            <button @click="productStore.addProduct(name, productArtists, productGenres, available, price, type)">Přidat</button>
        </section>
        <section>
            <h4>Upravit produkt</h4>
            <article class="property">
                <label for="product-old-name">Jméno</label>
                <select v-model="patchProductId" name="product-old-name" id="product-old-name">
                    <option v-for="(product, i) in productStore.products" :key="i" :value="product.id">{{ product.name }}</option>
                </select>
            </article>
            <article class="property">
                <label for="product-new-name">Nové jméno</label>
                <input v-model="newName" type="text" name="product-new-name" id="product-new-name" placeholder="Jméno produktu">
            </article>
            <article class="property">
                <label for="change-available">Dostupný</label>
                <input v-model="changeAvailable" type="checkbox" name="change-available" id="change-available">
            </article>
            <article class="property">
                <label for="new-price">Cena</label>
                <input v-model="newPrice" type="number" name="new-price" id="new-price" placeholder="Cena produktu">
            </article>
            <button @click="productStore.patchProduct(newName, changeAvailable, newPrice, patchProductId)">Upravit</button>
        </section>
        <section>
            <h4>Smazat produkt</h4>
            <article class="property">
                <label for="product-delete-name">Jméno</label>
                <select v-model="deleteProductId" name="product-delete-name" id="product-delete-name">
                    <option v-for="(product, i) in productStore.products" :key="i" :value="product.id">{{ product.name }} - {{ product.type }}</option>
                </select>
            </article>
            <button @click="productStore.deleteProduct(deleteProductId)">Smazat</button>
        </section>
    </article>
</template>

<style lang="scss" scoped>
    @import '../mixins.scss';
    
    article{
        @include flex-row;
        align-items: start;
        gap: 10%;

        >section{
            @include flex-column;
            width: 20%;
            padding: 20px;
            gap: 20px;

            .property{
                width: 100%;
                @include flex-column;
                gap: 5px;
            }

            button{
                @include button;
            }

            select, input{
                box-sizing: border-box;
                width: 100%;
            }
        }
    }
</style>