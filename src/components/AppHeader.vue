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
    },
    findTvShow() {
      this.getApiResult("tv", "tvShows");
    },
  },
};
</script>

<template>
  <form @submit.prevent="findMovie(), findTvShow()" class="text-center my-4">
    <input v-model="store.userInput" type="text" class="mx-4" />
    <button>Search</button>
  </form>
</template>



<style lang="scss" scoped>
</style>
