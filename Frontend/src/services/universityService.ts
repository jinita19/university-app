import axios from 'axios';
import { performanceTracing } from './helpers';

export const fetchUniversities = (country: string, name: string) => {
  return performanceTracing(() =>
    axios.get(
      `http://localhost:5001/api/universities?country=${country}&name=${name}`,
    ),
  );
};
