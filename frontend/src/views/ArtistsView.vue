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
      <section>
        <h2>Interpreti</h2>
      </section>
      <section class="artists">
        <RouterLink v-for="(artist, i) in artistData.artists" :key="i" :to="{name: 'artist', params: {id: artist.id}}" :style="{ backgroundImage: `url('http://localhost:3000/uploads/${artist.image}')`}">
          <div class="overlay">{{ artist.name }}</div>
        </RouterLink>
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
        justify-content: flex-start;

        h2{
            padding: 20px;
            color: green;
        }

        .artists{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
    }
    
    a{
        @include block;
        display: flex;
        position: relative;
        background-size: contain;
        text-align: center;
    }
</style>