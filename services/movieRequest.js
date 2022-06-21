import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {
  api_key: '44fa49323c20af460aba0be800b63ca2',
  language: 'en',
  region: 'US'
}

export const queryRequest = (query) => {
  return axios.get(`/search/movie?query=${query}&page=1`);
};

export const popularRequest = () => {
  return axios.get(`/movie/top_rated`);
};

export const pageRequest = (id) => {
  return axios.get(`/movie/${id}`);
}
export const reviewsRequest = (id) => {
  return axios.get(`/movie/${id}/reviews`);

};
export const castRequest = (id) => {
  return axios.get(`/movie/${id}/credits`);

};