import axios from 'axios';
import { getApiUrl } from './helpers';

export const fetchCountries = async () => {
  const response = await axios.get(getApiUrl('/countries'));
  return response.data;
};
