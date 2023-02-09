<script>
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
        
    },
};
</script>


<template>

  <AppHeader/> 
  <AppMain/>
  
</template>


<style lang="scss">
@use "./styles/main";
</style>