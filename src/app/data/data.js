import requests from "@/Requests";

export const trending = {
  request: requests.requestTrending,
  title: 'Trending'
};

export const upcoming = {
  request: requests.requestUpComing,
  title: 'Up Coming'
};

export const popular = {
  request: requests.requestPopular,
  title: 'Popular'
};

export const top_rated = {
  request: requests.requestTopRated,
  title: 'Top Rated'
};
