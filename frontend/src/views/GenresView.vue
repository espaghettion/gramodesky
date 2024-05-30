<script setup>
  import { onMounted } from "vue";
  import { useGenreStore } from "@/stores/genreData";

  const genreData = useGenreStore();

  onMounted(() => {
    genreData.loadGenres();
  })
</script>

<template>
    <main>
        <section>
            <h2>Žánry</h2>
        </section>
        <section class="genres">
            <RouterLink v-for="(genre, i) in genreData.genres" :key="i" :to="{name: 'genre', params: {id: genre.id}}">{{ genre.name }}</RouterLink>
        </section>
    </main>
</template>

<style lang="scss" scoped>
    @import '../mixins.scss';
    main{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;

        h2{
            padding: 20px;
            color: green;
        }

        .genres{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
    }

    a{
        @include block;
        background-color: white;
        border: 5px solid green;
        color: green;
        text-align: center;

        &:hover{
            color: white;
            background-color: green;
        }
    }
</style>