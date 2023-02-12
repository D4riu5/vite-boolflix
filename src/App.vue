<script>
import axios from 'axios';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import { store } from "./store.js";

export default {
    name: "App",
    components: {
      AppHeader,
      AppMain,
    },
    data() {
          return {
             store, 
          }
      },
    methods:{
      getGenresApi(endPoint, storeTarget) {
        axios
          .get(`https://api.themoviedb.org/3/genre/${endPoint}/list`, {
            params: {
              api_key: "1f883ae07d184cc1f4eadd8b60bf26db",
            },
          })
          .then(resp => {
            this.store[storeTarget] = resp.data.genres
        });
      },
      getMoviegenres() {
        this.getGenresApi(`movie`, `moviesGenres`);
        setTimeout(() => {
          store.moviesGenres.forEach(genre => {
            genre.selected = true;
          });
        }, 1);
        
      },
      getTvShowsGenres() {
        this.getGenresApi(`tv`, `tvShowsGenres`);
        setTimeout(() => {
          store.tvShowsGenres.forEach(element => {
            element.selected = true;
          }); 
        }, 1);

      },
      
    },
    
    created() {
      this.getMoviegenres();
      this.getTvShowsGenres();
    },
};
</script>


<template>
  <div class="">
    <AppHeader/> 
    <AppMain/>
  </div>

</template>


<style lang="scss">
@use "./styles/main";
</style>