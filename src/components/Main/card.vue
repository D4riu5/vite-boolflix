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
  methods: {},
};
</script>

<template>

  <!-- MOVIES -->
  <div v-if="this.store.movies.length > 0">

    <h3 class="m-4 text-white">
        Movies
    </h3>
    <div  class="text-center text-white d-flex justify-content-center flex-wrap">

      <card-info 
      v-for="(card, index) in this.store.movies"
      :card="card"
      :type="'movie'"
      :index="index + 1"/>

    </div>
  </div>


<!-- TV SHOWS -->
  <div v-if="this.store.movies.length > 0">
    
    <h3 class="m-4 text-white">
        Tv-Shows
    </h3>
    <div  class="text-center text-white d-flex justify-content-center flex-wrap">

      <card-info 
      v-for="(card, index) in this.store.tvShows"
      :card="card"
      :type="'tvShow'"
      :index="index + 1"/>

    </div>
  </div>

</template>

<style lang="scss" scoped></style>
