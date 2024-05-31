<script setup>
    import { useArtistStore } from "@/stores/artistData";
    import { ref } from "vue";

    const artistStore = useArtistStore();

    artistStore.loadArtists();
    const artists = artistStore.artists;

    const name = ref("");
    const description = ref("");

    const newName = ref("");
    const newDescription = ref("");
    const patchArtistId = ref();

    const deleteArtistId = ref();
</script>

<template>
    <article>
        <section>
            <h4>Přidat interpreta</h4>
            <article class="property">
                <label for="artist-name">Jméno</label>
                <input v-model="name" type="text" name="artist-name" id="artist-name" placeholder="Jméno interpreta">
            </article>
            <article class="property">
                <label for="artist-description">Popisek</label>
                <textarea v-model="description" name="artist-description" id="artist-description" placeholder="Popisek interpreta"></textarea>
            </article>
            <article class="property">
                <label for="type">Obrázek</label>
                <input @change="(val) => image = val.target.files" type="file" name="image" id="image">
            </article>
            <button @click="artistStore.addArtist(name, description, image[0])">Přidat</button>
        </section>
        <section>
            <h4>Upravit interpreta</h4>
            <article class="property">
                <label for="artist-old-name">Jméno</label>
                <select v-model="patchArtistId" name="artist-old-name" id="artist-old-name">
                    <option v-for="(artist, i) in artistStore.artists" :key="i" :value="artist.id">{{ artist.name }}</option>
                </select>
            </article>
            <article class="property">
                <label for="artist-new-name">Nové jméno</label>
                <input v-model="newName" type="text" name="artist-new-name" id="artist-new-name" placeholder="Jméno interpreta">
            </article>
            <article class="property">
                <label for="artist-new-description">Nový popisek</label>
                <textarea v-model="newDescription" name="artist-new-description" id="artist-new-description" placeholder="Popisek interpreta"></textarea>
            </article>
            <button @click="artistStore.patchArtist(newName, newDescription, patchArtistId)">Upravit</button>
        </section>
        <section>
            <h4>Smazat interpreta</h4>
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
    
    @include form;
</style>