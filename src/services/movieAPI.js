import axios from 'axios';

const API_KEY = 'a54c376e44f3c864af06f6156cb97b87';
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  api_key: API_KEY,
  AUTH_TOKEN:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTRjMzc2ZTQ0ZjNjODY0YWYwNmY2MTU2Y2I5N2I4NyIsInN1YiI6IjY1YjNlNDg3YjMzMTZiMDE4NWExMWVmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aVGSnDLneY1Xvr9AyNccE6KPZlTCbUNq-YVd1aJmKQE',
};
axios.defaults.headers.common['Authorization'] = options.AUTH_TOKEN;

export const getTrending = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getsearchMovies = async searchTerm => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?query=${searchTerm}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovieDetails = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovieCredits = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/credits`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

export const getMovieReviews = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};