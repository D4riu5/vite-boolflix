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
           
    }
  
  }
};
</script>

<template>
  <div class="w-25 m-4 p-2 bg-primary">
    <div>{{ 'Card ' + index }}</div>
    <img :src="card.backdrop_path ? 'http://image.tmdb.org/t/p/w342' + card.backdrop_path : 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'" :alt="titleVariant">
    <div>{{ `Title: ${titleVariant}` }}</div>
    <div>{{ `Original Title: ${originalTitleVariant}` }}</div>
    <div>
      <span v-if="card.original_language.length == 2" >
        Language: <span :class="`fi fi-${card.original_language}`"></span>
      </span>
      <span v-else >Unknown Original Language</span>
    </div>
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
    <div>
      <i class="fa-solid fa-user"></i>
      {{ card.vote_count }}
    </div>
  </div>
  
</template>

<style lang="scss" scoped>
  img{
    width: 342px;
    aspect-ratio: 2/1.13;
    object-fit: cover;
  }

  // icons
  .fa-star{
    color: rgb(243, 166, 50);
  }

  </style>
