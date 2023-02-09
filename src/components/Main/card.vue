<script>
import { store } from "../../store.js";

export default {
  name: "card",
  components: {},
  data() {
    return {
      store,
    };
  },
  methods: {},
};
</script>

<template>
  <div  class="text-center text-white d-flex justify-content-center flex-wrap">
    <div v-for="(card, index) in this.store.movies" class="w-25 m-4 p-2 bg-primary">
      <div>
        {{ 'Card ' + (index += 1)  }}
      </div>
      <div>
        {{ 'Title: ' + card.title }}
      </div>
      <div>
        {{ 'Original Title: ' + card.original_title }}
      </div>
      <div>
        {{ 'Lang: ' + card.original_language }}
      </div>
      <div>
        {{ 'Rating : ' + card.vote_average }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
