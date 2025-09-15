import axios from 'axios';
import { fetchUniversities } from './universityService';
import { performanceTracing, getApiUrl } from './helpers';

jest.mock('axios');
jest.mock('./helpers');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedPerformanceTracing = performanceTracing as jest.Mock;
const mockedGetApiUrl = getApiUrl as jest.Mock;

describe('University service functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedGetApiUrl.mockImplementation((endpoint: string) =>
      endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`,
    );
  });

  it('calls fetchUniversity with correct URL', async () => {
    mockedPerformanceTracing.mockImplementation(async (fn) => {
      await fn();
      return { success: true };
    });
    const country = 'canada';
    const name = 'we';
    await fetchUniversities(country, name);

    expect(performanceTracing).toHaveBeenCalledWith(expect.any(Function));
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `/api/universities?country=${country}&name=${name}`,
    );
  });
});
