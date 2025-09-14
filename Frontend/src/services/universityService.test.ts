import axios from 'axios';
import { fetchUniversities } from './universityService';
import { performanceTracing } from './helpers';

jest.mock('axios');
jest.mock('./helpers');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedPerformanceTracing = performanceTracing as jest.Mock;

describe('University service functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
      `http://localhost:5001/api/universities?country=${country}&name=${name}`,
    );
  });
});
