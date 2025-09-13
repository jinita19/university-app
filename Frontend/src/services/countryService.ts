import axios from 'axios';

export const fetchCountries = async () => {
  const response = await axios.get(' http://localhost:5001/api/countries');
  return response.data;
};