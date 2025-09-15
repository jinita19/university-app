import axios from 'axios';
import { fetchCountries } from './countryService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchCountries', () => {
  it('returns data when API call succeeds', async () => {
    const mockData = ['Canada', 'USA', 'India'];
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await fetchCountries();
    expect(result).toBe(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      ' http://localhost:5001/api/countries',
    );
  });

  it('throws error when API call fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    await expect(fetchCountries()).rejects.toThrow('Network Error');
  });
});
