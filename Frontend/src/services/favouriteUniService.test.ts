import axios from 'axios';
import {
  addFavorite,
  removeFavorite,
  getFavouriteUniversities,
} from './favouriteUniService';
import { performanceTracing, getApiUrl } from './helpers';

jest.mock('axios');
jest.mock('./helpers');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedPerformanceTracing = performanceTracing as jest.Mock;
const mockedGetApiUrl = getApiUrl as jest.Mock;

describe('Favorites service functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedGetApiUrl.mockImplementation((endpoint: string) =>
      endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`,
    );
  });

  it('calls addFavorite with correct URL', async () => {
    mockedPerformanceTracing.mockImplementation(async (fn) => {
      await fn();
      return { success: true };
    });
    const uniId = 3;

    await addFavorite(uniId);

    expect(performanceTracing).toHaveBeenCalledWith(expect.any(Function));
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/favourites/3');
  });

  it('calls removeFavorite with correct URL', async () => {
    mockedPerformanceTracing.mockImplementation(async (fn) => {
      await fn();
      return { success: true };
    });
    const uniId = 7;

    await removeFavorite(uniId);

    expect(performanceTracing).toHaveBeenCalledWith(expect.any(Function));
    expect(mockedAxios.delete).toHaveBeenCalledWith('/api/favourites/7');
  });

  it('calls getFavouriteUniversities: returns data on success', async () => {
    const mockData = ['uni1', 'uni2'];
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await getFavouriteUniversities();

    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/favourites');
  });
});
