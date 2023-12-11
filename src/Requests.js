export const key ='e19b0b3b5352d0c8b350a65575d08ccc';

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=en-US`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    requestNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
    requestPopularTV: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`,
    requestAiringToday: `https://api.themoviedb.org/3/tv/airing_today?api_key=${key}&language=en-US&page=1`,
    requestLatest: `https://api.themoviedb.org/3/movie/latest?api_key=${key}&language=en-US`,
    requestNowPlayingTV: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${key}&language=en-US&page=1`,
    requestTopRatedTV: `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`,
    
};

export default requests;
