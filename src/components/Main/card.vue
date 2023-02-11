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

    nextSlides(type) {
      if (this.store[type].length <= 3) {
        this.store[`${type}Index`] = 0;
      } else {
        this.store[`${type}Index`] += 4;
        
        if (this.store[`${type}Index`] >= this.store[type].length) {
          this.store[`${type}Index`] = 0;
        }
      }
    },

    prevSlides(type) {
      if (this.store[type].length <= 3) {
        this.store[`${type}Index`] = 0;
      } else {
        this.store[`${type}Index`] -= 4;

        // DONT KNOW HOW TO SIMPLIFY THIS ANY FURTHER (i tried for 2 hours )
        if (this.store[`${type}Index`] < 0) {
          switch (this.store[type].length) {
            case 20:
            case 16:
            case 12:
            case 8:
            case 4:
              this.store[`${type}Index`] = this.store[type].length - 4;
              break;
            case 19:
            case 15:
            case 11:
            case 7:
              this.store[`${type}Index`] = this.store[type].length - 3;
              break;
            case 18:
            case 14:
            case 10:
            case 6:
              this.store[`${type}Index`] = this.store[type].length - 2;
              break;
            case 17:
            case 13:
            case 9:
            case 5:
              this.store[`${type}Index`] = this.store[type].length - 1;
              break;
          }
        }
          
      }
    }
  },
};
</script>

<template>

  <!-- MOVIES -->
  <div v-if="this.store.movies.length > 0" class="mb-5 position-relative">

    <h3 class="my-3 text-white">
        Movies
    </h3>

    <div class="p-2 text-center text-white d-flex justify-content-center">
      <card-info 
      v-for="(card, index) in this.store.movies.slice(store.moviesIndex, store.moviesIndex + 4)"
      :card="card"
      :type="'movie'"
      :index="index + 1"/>
    </div>

    <!-- buttons -->
    <button @click="prevSlides('movies')" class="btn btn-light rounded-circle position-absolute top-50 translate-middle-y my_button-l">
      <i class="fas fa-arrow-left"></i>
    </button>
    <button @click="nextSlides('movies')" class="btn btn-light rounded-circle position-absolute top-50 translate-middle-y my_button-r">
      <i class="fas fa-arrow-right"></i>
    </button>

  </div>




<!-- TV SHOWS -->
  <div v-if="this.store.tvShows.length > 0" class="mb-5 position-relative">
    
    <h3 class="my-3 text-white">
        Tv-Shows
    </h3>

    <div class="p-2 text-center text-white d-flex justify-content-center">
      <card-info 
      v-for="(card, index) in this.store.tvShows.slice(store.tvShowsIndex, store.tvShowsIndex + 4)
      " :card="card" :type="'tvShow'"/>
    </div>

    <!-- buttons -->
    <button @click="prevSlides('tvShows')" class="btn btn-light rounded-circle position-absolute top-50 translate-middle-y my_button-l">
      <i class="fas fa-arrow-left"></i>
    </button>
    <button @click="nextSlides('tvShows')" class="btn btn-light rounded-circle position-absolute top-50 translate-middle-y my_button-r">
      <i class="fas fa-arrow-right"></i>
    </button>

  </div>
</template>

<style lang="scss" scoped>
.my_button-l{
  left: -60px;
}

.my_button-r{
  right: -60px;
}
</style>
