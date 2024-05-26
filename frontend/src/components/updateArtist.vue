<script setup>
    import { useArtistStore } from "@/stores/artistData";
    import { ref } from "vue";

    const artistStore = useArtistStore();

    artistStore.loadArtists();
    const artists = artistStore.artists;

    const name = ref("");

    const newName = ref("");
    const patchArtistId = ref();

    const deleteArtistId = ref();
</script>

<template>
    <article>
        <section>
            <h4>Přidat umělce</h4>
            <article class="property">
                <label for="artist-name">Jméno</label>
                <input v-model="name" type="text" name="artist-name" id="artist-name" placeholder="Jméno umělce">
            </article>
            <button @click="artistStore.addArtist(name)">Přidat</button>
        </section>
        <section>
            <h4>Upravit umělce</h4>
            <article class="property">
                <label for="artist-old-name">Jméno</label>
                <select v-model="patchArtistId" name="artist-old-name" id="artist-old-name">
                    <option v-for="(artist, i) in artistStore.artists" :key="i" :value="artist.id">{{ artist.name }}</option>
                </select>
            </article>
            <article class="property">
                <label for="artist-new-name">Nové jméno</label>
                <input v-model="newName" type="text" name="artist-new-name" id="artist-new-name" placeholder="Jméno umělce">
            </article>
            <button @click="artistStore.patchArtist(newName, patchArtistId)">Upravit</button>
        </section>
        <section>
            <h4>Smazat umělce</h4>
            <article class="property">
                <label for="artist-delete-name">Jméno</label>
                <select v-model="deleteArtistId" name="artist-delete-name" id="artist-delete-name">
                    <option v-for="(artist, i) in artistStore.artists" :key="i" :value="artist.id">{{ artist.name }}</option>
                </select>
            </article>
            <button @click="artistStore.deleteArtist(deleteArtistId)">Smazat</button>
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