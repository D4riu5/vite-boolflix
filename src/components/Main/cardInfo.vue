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
    }
  }
};
</script>

<template>
  <div class="w-25 m-4 p-2 bg-primary">
    <div>{{ 'Card ' + index }}</div>
    <div>{{ `Title: ${titleVariant}` }}</div>
    <div>{{ `Original Title: ${originalTitleVariant}` }}</div>
    <div>
      <span v-if="card.original_language.length == 2" >
        Lang: <span :class="`fi fi-${card.original_language}`"></span>
      </span>
      <span v-else >Unknown Original Language</span>
    </div>
    <div>{{ `Rating : ${card.vote_average}` }}</div>
  </div>
  
</template>

<style lang="scss" scoped></style>
