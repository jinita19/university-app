import type { AxiosResponse } from "axios";

export type University = {
  id: number;
  name: string;
  stateProvince: string;
  webPages: string[];
  isFavourite: boolean;
};

export type UniversityData = {
  id: number;
  name: string;
  state_province: string;
  web_pages: string[];
  is_favourite: boolean;
  country:string;
  domains: string[];
  alpha_two_code: string;
};

export type ApiData = {
  endpoint: string | null;
  status: number | string | null;
  duration: number | null;
  isError: boolean;
};

export type FetchResult<T> = {
  data: T;
  duration: number;
  endpoint: string;
  statusCode: number | string | undefined;
};

export type ApiCall<T> = () => Promise<AxiosResponse<T>>;
