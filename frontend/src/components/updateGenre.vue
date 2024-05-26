<script setup>
    import { useGenreStore } from "@/stores/genreData";
    import { ref } from "vue";

    const genreStore = useGenreStore();

    genreStore.loadGenres();
    const genres = genreStore.genres;

    const name = ref("");

    const newName = ref("");
    const patchGenreId = ref();

    const deleteGenreId = ref();
</script>

<template>
    <article>
        <section>
            <h4>Přidat žánr</h4>
            <article class="property">
                <label for="genre-name">Jméno</label>
                <input v-model="name" type="text" name="genre-name" id="genre-name" placeholder="Jméno žánru">
            </article>
            <button @click="genreStore.addGenre(name)">Přidat</button>
        </section>
        <section>
            <h4>Upravit žánr</h4>
            <article class="property">
                <label for="genre-old-name">Jméno</label>
                <select v-model="patchGenreId" name="genre-old-name" id="genre-old-name">
                    <option v-for="(genre, i) in genreStore.genres" :key="i" :value="genre.id">{{ genre.name }}</option>
                </select>
            </article>
            <article class="property">
                <label for="genre-new-name">Nové jméno</label>
                <input v-model="newName" type="text" name="genre-new-name" id="genre-new-name" placeholder="Jméno žánru">
            </article>
            <button @click="genreStore.patchGenre(newName, patchGenreId)">Upravit</button>
        </section>
        <section>
            <h4>Smazat žánr</h4>
            <article class="property">
                <label for="genre-delete-name">Jméno</label>
                <select v-model="deleteGenreId" name="genre-delete-name" id="genre-delete-name">
                    <option v-for="(genre, i) in genreStore.genres" :key="i" :value="genre.id">{{ genre.name }}</option>
                </select>
            </article>
            <button @click="genreStore.deleteGenre(deleteGenreId)">Smazat</button>
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