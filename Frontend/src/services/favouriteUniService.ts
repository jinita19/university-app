import axios from 'axios';

export const addFavorite = async (uniId: string) => {
  return axios.post(`http://localhost:5001/api/favourites/${uniId}`);
};

export const removeFavorite = async (uniId: number) => {
  return axios.delete(`http://localhost:5001/api/favourites/${uniId}`);
};

export const getFavouriteUniversities = async () => {
    try {
        const response = await axios(`http://localhost:5001/api/favourites`);
        return response.data;
    } catch(err) {
        console.log(err);
    }
}