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
      if (this.store.selectedOption == 'both' || this.store.selectedOption == 'movies') {
        this.store.movies = [];
        this.store.tvShows = [];
        this.getApiResult("movie", "movies");
        this.store.moviesIndex = 0;
        this.store.tvShowsIndex = 0;
        setTimeout(() => {
          this.fetchMovieActors();
          this.fetchTvActors();
        }, 1);
      
      }
    },
    findTvShow() {
      if (this.store.selectedOption == 'both' || this.store.selectedOption == 'tvShows') {
        this.store.movies = [];
        this.store.tvShows = [];
        this.getApiResult("tv", "tvShows");
        this.store.moviesIndex = 0;
        this.store.tvShowsIndex = 0;
        setTimeout(() => {
            this.fetchTvActors();
        }, 1);
      }
    },

    reset() {
      this.store.userInput = '';
      this.findMovie();
      this.findTvShow();
      store.moviesGenres.forEach(genre => {
        genre.selected = true;
      });
      store.tvShowsGenres.forEach(genre => {
        genre.selected = true;
      });
      store.advanced = false;

    },

    // ADD ACTORS (dont know how to simplify the code more than this)
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

    updateMovies() {
        this.store.movies = this.store.movies.filter(movie => {
          if (!this.store.advanced) return true;
          return movie.genre_ids.some(id => this.store.moviesGenres.find(genre => genre.id === id).selected);
        });
    },
    
    updateTvShows() {
        this.store.tvShows = this.store.tvShows.filter(show => {
          if (!this.store.advanced) return true;
          return show.genre_ids.some(id => this.store.tvShowsGenres.find(genre => genre.id === id).selected);
        });
    },

  },
  created() {
    
  }
}
</script>

<template>
  <div class="d-flex flex-column justify-content-between align-items-center mx-5 p-4">
    <img @click="reset()" src="../assets/logo.png" alt="">

    <form @submit.prevent="findMovie(), findTvShow()" class="text-center my-4 d-flex justify-content-center">
      <select @change="findMovie(), findTvShow()" v-model="store.selectedOption">
        <option selected value="both">Both</option>
        <option value="movies">Movies</option>
        <option value="tvShows">TV Shows</option>
      </select>
      <input required :placeholder="store.selectedOption == 'both' ? 'Search for both Movies and TV shows' : store.selectedOption === 'movies' ? 'Search for Movies' : 'Search for TV shows' " v-model="store.userInput" type="text" class="mx-4 form-control" id="searchBar"/>
      <button class="btn btn-light me-2">Search</button>
      <button @click.prevent="store.advanced = !store.advanced; updateMovies(); updateTvShows()" class="btn btn-light d-flex align-items-center">
        <span class="pe-2">Advanced</span>
        <i :class="!store.advanced ? `fa-caret-down` : 'fa-caret-up'" class="fa-solid"></i>
      </button>
    </form>

    <div v-show="store.advanced == true" class="my_genres-container text-white bg-danger px-2 py-3">
      <div v-if="store.selectedOption == 'both' || store.selectedOption == 'movies'">
        <h5 class="p-2 my-0 fw-bold">Movies genres</h5>
        <div class="d-flex flex-wrap border-top border-bottom p-2">
          <div v-for="genre in store.moviesGenres" key="movieGenre.id">
            <input type="checkbox"  :name="genre.name" class="ms-2 me-1" :value="genre.selected" v-model="genre.selected">
            <label class="me-2" :class="genre.selected ? 'border-bottom': ''"  @click="genre.selected = !genre.selected; updateMovies()" :for="genre.name"> {{ genre.name }}</label>
          </div>
        </div>
      </div>

      <div v-if="store.selectedOption == 'both' || store.selectedOption == 'tvShows'">
        <h5 class="p-2 my-0 fw-bold">TV Shows genres</h5>
        <div class="d-flex flex-wrap border-top border-bottom p-2">
          <div v-for="genre in store.tvShowsGenres" key="tvShowGenre.id">
            <input type="checkbox"  :name="genre.name" class="ms-2 me-1" :value="genre.selected" v-model="genre.selected">
            <label class="me-2" :class="genre.selected ? 'border-bottom': ''" @click="genre.selected = !genre.selected; updateTvShows()" :for="genre.name"> {{ genre.name }}</label>
          </div>
        </div>
      </div>
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

  #searchBar{
    min-width: 80%;
  }

  .my_genres-container {
    max-width: 770px;
  }
</style>
