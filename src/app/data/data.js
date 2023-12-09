import requests from "@/Requests";

export const trending = {
  request: requests.requestTrending,
  title: 'Trending',
  route: 'trending'
};

export const upcoming = {
  request: requests.requestUpComing,
  title: 'Up Coming',
  route: 'upcoming'
};

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
