<script>
import { store } from "../../store.js";

export default {
  name: "cardInfo",
  components: {},
  data() {
    return {
      store,
    };
  },
  props: {
    card: Object,
    type: String,
    index: Number,
  },
  methods: {
    printGenres(id, type) {
      if (type == 'movie') {
        let genre = this.store.moviesGenres.find(element => element.id === id);
        return genre ? genre.name : 'Unknown';
      } else {
        let genre = this.store.tvShowsGenres.find(element => element.id === id);
        return genre ? genre.name : 'Unknown';
      }

    },
  },
  computed: {
    titleVariant() {
      return this.type === 'movie' ? this.card.title : this.card.name;
    },
    originalTitleVariant() {
      return this.type === 'movie' ? this.card.original_title : this.card.original_name;
    },

    formattedRating() {
      let halfedRating = Math.ceil(this.card.vote_average / 2);
      return halfedRating > 5 ? 5 : halfedRating;
    },

    
  
  }
}
</script>

<template>
  <div class="my_card-container w-25 mx-2 p-2">

    <!-- card image -->
    <div class="my_img-container position-relative">
      <img :src="card.poster_path ? 'http://image.tmdb.org/t/p/w500' + card.poster_path : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'" :alt="titleVariant">
      
      <div class="my_info-container position-absolute top-0 start-50 translate-middle-x overflow-auto p-3 d-flex flex-column">
        <!-- card title -->
        <h5>{{ titleVariant }}</h5>
        <!-- card og title -->
        <div class="p-2">{{ `Original Title: ${originalTitleVariant}` }}</div>
        <!-- card language -->
        <div class="py-1">
          <span v-if="card.original_language.length == 2" >
            <span :class="`fi fi-${card.original_language}`"></span>
          </span>
          <span v-else >Unknown Original Language</span>
        </div>
        <!-- card rating -->
        <div>
          <template v-for="i in 5">
            <i :class="{
              'fa-solid': i <= formattedRating,
              'fa-regular': i > formattedRating,
              }"
              class="fa-star"
            ></i>
          </template>
        </div>
        <!-- card vote count -->
        <div>
          <i class="fa-solid fa-user"></i>
          {{ card.vote_count }}
        </div>

        <!-- card GENRES -->
        <div class="d-flex flex-column justify-content-between py-2">
          <span v-for="index in card.genre_ids" class="text-danger">
            {{`#` + printGenres(index, type) }}
          </span>
        </div>

        <!-- card ACTORS -->
        <div class="d-flex flex-column">
          <span v-for="element in card.actors" class="text-warning">
            {{ element.original_name }}
          </span>
        </div>

        <!-- overview -->
        <div class="py-2 text-start">
          {{ card.overview }}
        </div>

      </div>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
  @use "../../styles/partials/variables.scss" as *;


  .my_card-container{
    max-width: 304px;
    &:hover .my_info-container{
      background-color: $black-transparent;
      opacity: 1;
      
    }

    .my_img-container{
      max-width: 304px;
      min-width: 220px;
    }
    .my_info-container{
      width: 100.5%;
      height: 100.1%;
      opacity: 0;
      transition: 0.3s;
      scrollbar-color: $gray $black;
    };

    img{
      width: 100%;
      aspect-ratio: 1/1.5;
      object-fit: cover;
      // object-position: top;
    };
  };

  // icons
  .fa-star{
    color: $orange;
  }

</style>
