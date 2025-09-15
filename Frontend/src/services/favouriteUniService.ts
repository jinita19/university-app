import axios from 'axios';
import { performanceTracing, getApiUrl } from './helpers';

export const addFavorite = (uniId: number) => {
  return performanceTracing(() =>
    axios.post(getApiUrl(`/favourites/${uniId}`)),
  );
};

export const removeFavorite = async (uniId: number) => {
  return performanceTracing(() =>
    axios.delete(getApiUrl(`/favourites/${uniId}`)),
  );
};

export const getFavouriteUniversities = async () => {
  try {
    const response = await axios.get(getApiUrl('/favourites'));
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
