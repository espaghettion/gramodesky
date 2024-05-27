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
        <RouterLink v-for="(genre, i) in genreData.genres" :key="i" :to="{name: 'genre', params: {id: genre.id}}">{{ genre.name }}</RouterLink>
    </main>
</template>

<style lang="scss" scoped>
    @import '../mixins.scss';
    main{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    a{
        @include block;
        background-color: white;
        border: 5px solid green;
        color: green;

        &:hover{
            color: white;
            background-color: green;
        }
    }
</style>