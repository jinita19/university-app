/* eslint-disable @typescript-eslint/no-explicit-any */
import { mapUniversityData, setApiStatus } from './helpers';
import type { UniversityData, FetchResult } from './types/types';

describe('mapUniversityData', () => {
  it('maps UniversityData array to University array', () => {
    const uniData: UniversityData[] = [
      {
        id: 1,
        name: 'Uni 1',
        state_province: 'Ontario',
        web_pages: ['http://uni1.edu'],
        is_favourite: true,
        country: 'canada',
        domains: ['edu'],
        alpha_two_code: 'CA',
      },
      {
        id: 2,
        name: 'Uni 2',
        state_province: '',
        web_pages: ['http://uni2.edu'],
        is_favourite: false,
        country: 'usa',
        domains: ['com'],
        alpha_two_code: 'UA',
      },
    ];

    const result = mapUniversityData(uniData);

    expect(result).toEqual([
      {
        id: 1,
        name: 'Uni 1',
        stateProvince: 'Ontario',
        webPages: ['http://uni1.edu'],
        isFavourite: true,
      },
      {
        id: 2,
        name: 'Uni 2',
        stateProvince: '',
        webPages: ['http://uni2.edu'],
        isFavourite: false,
      },
    ]);
  });
});

describe('setApiStatus', () => {
  it('sets api data for success', () => {
    const mockSetApiData = jest.fn();
    const res: FetchResult<any> = {
      endpoint: '/api/test',
      statusCode: 200,
      duration: 123,
      data: undefined,
    };

    setApiStatus('success', mockSetApiData)(res);

    expect(mockSetApiData).toHaveBeenCalledWith({
      endpoint: '/api/test',
      status: 200,
      duration: 123,
      isError: false,
    });
  });

  it('handles missing statusCode', () => {
    const mockSetApiData = jest.fn();
    const res: FetchResult<any> = {
      endpoint: '/api/test',
      duration: 50,
      data: undefined,
      statusCode: undefined,
    };

    setApiStatus('error', mockSetApiData)(res);

    expect(mockSetApiData).toHaveBeenCalledWith({
      endpoint: '/api/test',
      status: null,
      duration: 50,
      isError: true,
    });
  });
});
