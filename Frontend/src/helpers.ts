import type {
  ApiData,
  FetchResult,
  University,
  UniversityData,
} from "./Types/types";

export function mapUniversityData(data: UniversityData[]): University[] {
  return data.map((data) => ({
    id: data.id,
    name: data.name,
    stateProvince: data.state_province,
    webPages: data.web_pages,
    isFavourite: data.is_favourite,
  }));
}

export function setApiStatus<T>(
  from: "success" | "error",
  setApiData: React.Dispatch<React.SetStateAction<ApiData>>
) {
  return (res: FetchResult<T>) =>
    setApiData({
      endpoint: res.endpoint,
      status: res.statusCode ?? null,
      duration: res.duration,
      isError: from === "error",
    });
}
