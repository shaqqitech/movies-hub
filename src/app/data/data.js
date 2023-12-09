import requests from "@/Requests";

export const popular = {
  request: requests.requestPopular,
  title: 'Popular',
  route: 'popular'
};

export const top_rated = {
  request: requests.requestTopRated,
  title: 'Top Rated',
  route: 'top-rated'
};
export const trending = {
  request: requests.requestTrending,
  title: 'Trending',
  route: 'trending'
};

export const upcoming = {
  request: requests.requestUpcoming,
  title: 'Up Coming',
  route: 'upcoming'
};

export const now_playing = {
  request: requests.requestNowPlaying,
  title: 'Now Playing',
  route: 'now-playing'
};

export const popularTv = {
  request: requests.requestPopularTV,
  title: 'Popular TV',
  route: 'popular-tv'
};

export const airing_today = {
  request: requests.requestAiringToday,
  title: 'Airing Today',
  route: 'airing-today'
};

export const playing_on_tv = {
  request: requests.requestNowPlayingTV,
  title: 'Playing on TV',
  route: 'playing-on-tv'
};

export const top_rated_tv = {
  request: requests.requestTopRatedTV,
  title: 'Top Rated TV',
  route: 'top-rated-tv'
};

export const category = [
  popular.title,
  top_rated.title,
  trending.title,
  upcoming.title,
  now_playing.title,
  popularTv.title,
  airing_today.title,
  playing_on_tv.title,
  top_rated_tv.title
];
