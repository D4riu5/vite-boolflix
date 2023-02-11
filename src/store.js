import { reactive } from 'vue'

export const store = reactive({
    userInput: '',
    movies: [],
    tvShows: [],
    moviesIndex: 0,
    tvShowsIndex: 0,
});

