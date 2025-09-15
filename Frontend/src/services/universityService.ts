import axios from 'axios';
import { performanceTracing, getApiUrl } from './helpers';

export const fetchUniversities = (country: string, name: string) => {
  return performanceTracing(() =>
    axios.get(getApiUrl(`/universities?country=${country}&name=${name}`)),
  );
};
