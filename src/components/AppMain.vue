<script>
import card from './Main/card.vue';
import { store } from "../store.js";

export default {
  name: "AppMain",
  components: {
    card,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    
  },
};
</script>

<template>
  <div class="container">
    <card/>
  </div>

</template>

<style lang="scss" scoped></style>
