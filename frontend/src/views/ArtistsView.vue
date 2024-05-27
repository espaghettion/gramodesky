<script setup>
  import { onMounted } from "vue";
  import { useArtistStore } from "@/stores/artistData";

  const artistData = useArtistStore();

  onMounted(() => {
    artistData.loadArtists();
  })
</script>

<template>
    <main>
        <RouterLink v-for="(artist, i) in artistData.artists" :key="i" :to="{name: 'artist', params: {id: artist.id}}">{{ artist.name }}</RouterLink>
    </main>
</template>

<style lang="scss" scoped>
    @import '../mixins.scss';
    
    a{
        @include block;
    }
</style>