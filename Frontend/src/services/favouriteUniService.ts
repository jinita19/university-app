import axios from 'axios';
import { performanceTracing } from './helpers';

export const addFavorite = (uniId: number) => {
  return performanceTracing(() => 
    axios.post(`http://localhost:5001/api/favourites/${uniId}`)
  );
};

export const removeFavorite = async (uniId: number) => {
  return performanceTracing(() => 
    axios.delete(`http://localhost:5001/api/favourites/${uniId}`)
  );
};

export const getFavouriteUniversities = async () => {
    try {
        const response = await axios(`http://localhost:5001/api/favourites`);
        return response.data;
    } catch(err) {
        console.log(err);
    }
}