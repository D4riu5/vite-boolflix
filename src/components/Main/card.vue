<script>
import { store } from "../../store.js";
import cardInfo from './cardInfo.vue'

export default {
  name: "card",
  components: {
    cardInfo,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    
  },
};
</script>

<template>

  <!-- MOVIES -->
  <div v-if="this.store.movies.length > 0" class="mb-5">

    <h3 class="my-3 text-white">
        Movies
    </h3>

    <div class="p-2 text-center text-white d-flex overflow-auto">
      <card-info 
      v-for="(card, index) in this.store.movies"
      :card="card"
      :type="'movie'"
      :index="index + 1"/>
    </div>
  </div>


<!-- TV SHOWS -->
  <div v-if="this.store.tvShows.length > 0">
    
    <h3 class="my-3 text-white">
        Tv-Shows
    </h3>

    <div  class="mb-5 p-2 text-center text-white d-flex overflow-auto">
      <card-info 
      v-for="(card, index) in this.store.tvShows"
      :card="card"
      :type="'tvShow'"
      />
    </div>
  </div>

</template>

<style lang="scss" scoped>

</style>
