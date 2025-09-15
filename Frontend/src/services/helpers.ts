import axios from 'axios';
import type { ApiCall, FetchResult } from '../types/types';

// API base URL configuration for Docker environment
export const getApiUrl = (endpoint: string): string => {
  return endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;
};

export const getEndpoint = (url: string | undefined): string | null => {
  if (!url) return null;
  const apiIndex: number = url?.indexOf('/api') as number;
  return apiIndex !== -1 ? (url?.substring(apiIndex) as string) : null;
};

export const getDuration = (startTime: number, endTime: number): number =>
  endTime - startTime;

export async function performanceTracing<T>(
  apiCall: ApiCall<T>,
): Promise<FetchResult<T>> {
  const startTime = performance.now();
  try {
    const response = await apiCall();
    const endTime = performance.now();

    return {
      data: response.data,
      duration: getDuration(startTime, endTime),
      endpoint: getEndpoint(response.config.url) as string,
      statusCode: response.status,
    };
  } catch (err: unknown) {
    const endTime = performance.now();
    let endpoint;
    let statusCode: string | number | undefined = undefined;
    if (axios.isAxiosError(err)) {
      endpoint = getEndpoint(err.config?.url);
      statusCode = err.code;
    }
    throw {
      duration: getDuration(startTime, endTime),
      endpoint,
      statusCode,
    };
  }
}
