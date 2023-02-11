<script>
import { store } from "../store.js";
import axios from "axios";

export default {
  name: "AppHeader",
  components: {},
  data() {
    return {
      store,
    };
  },
  methods: {
    getApiResult(endPoint, storeTarget) {
      if (this.store.userInput != "") {
        axios
          .get(`https://api.themoviedb.org/3/search/${endPoint}`, {
            params: {
              api_key: "1f883ae07d184cc1f4eadd8b60bf26db",
              query: this.store.userInput,
            },
          })
          .then((resp) => {
            this.store[storeTarget] = resp.data.results;
          });
      } else {
        this.store[storeTarget] = [];
      }
    },

    findMovie() {
      this.getApiResult("movie", "movies");
      this.store.moviesIndex = 0;
      this.store.tvShowsIndex = 0;
      setTimeout(() => {
        this.fetchMovieActors();
        this.fetchTvActors();
      }, 500);
      
    },
    findTvShow() {
      this.getApiResult("tv", "tvShows");
      this.store.moviesIndex = 0;
      this.store.tvShowsIndex = 0;
    },

    reset() {
      this.store.userInput = '';
      this.findMovie();
      this.findTvShow();
    },

    // ADD ACTORS (cant DRY the code further.. i've tried...)
    // ADD ACTORS TO store.movies
    getMovieActors(id) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=1f883ae07d184cc1f4eadd8b60bf26db&language=en-US`)
        .then((resp) => {
          const movie = this.store.movies.find(movie => movie.id === id);
          movie.actors = resp.data.cast.slice(0, 5)
        })
    },

    fetchMovieActors() {
      this.store.movies.map(movie => {
        this.getMovieActors(movie.id);
      });
    },

    // ADD ACTORS TO store.tvShows
    getTvActors(id) {
      axios
        .get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=1f883ae07d184cc1f4eadd8b60bf26db&language=en-US`)
        .then((resp) => {
          const tvShow = this.store.tvShows.find(tvShow => tvShow.id === id);
          tvShow.actors = resp.data.cast.slice(0, 5)
        })
    },

    fetchTvActors() {
      this.store.tvShows.map(tvShow => {
        this.getTvActors(tvShow.id);
      });
    },
    
    


  },
  created() {
    
  }
};
</script>

<template>
  <div class="d-flex flex-column justify-content-between align-items-center mx-5 p-4">
    <img @click="reset()" src="../assets/logo.png" alt="">

    <div class="w-50">
      <form @submit.prevent="findMovie(), findTvShow()" class="text-center my-4 d-flex">
        <input placeholder="Search for movies/tv shows" v-model="store.userInput" type="text" class="mx-4 form-control" />
        <button class="btn btn-light">Search</button>
      </form>
    </div>
  </div>
</template>



<style lang="scss" scoped>
 @use "../styles/partials/variables.scss" as *;

  img{
    width: 200px;
    aspect-ratio: 3/1;
    cursor: pointer;
  }
</style>
