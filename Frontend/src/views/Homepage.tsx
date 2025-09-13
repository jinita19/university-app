import { Button } from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { CountryDropdown } from "../components/CountryDropdown";
import { SearchInput } from "../components/common/SearchInput";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { fetchUniversities } from "../services/universityService";
import type { ApiData, FetchResult, University } from "../Types/types";
import { DataTable } from "../components/DataTable";
import { addFavorite, removeFavorite } from "../services/favouriteUniService";
import { mapUniversityData, setApiStatus } from "../helpers";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryInput, setCountryInput] = useState("");
  const debouncedQuery = useDebounce(searchQuery);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [universityList, setUniversityList] = useState<University[]>([]);
  const [showApiDetails, setShowApiDetails] = useState(false);
  const [apiData, setApiData] = useState<ApiData>({
    endpoint: null,
    status: null,
    duration: null,
    isError: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedCountry) return;
    if (debouncedQuery.length >= 2) {
      fetchUniversities(selectedCountry.toLowerCase(), debouncedQuery)
        .then((res) => {
          setUniversityList(mapUniversityData(res.data));
          setApiStatus("success", setApiData)(res);
        })
        .catch((error) => {
          console.error("Error fetching universities:", error);
          setApiStatus("error", setApiData)(error);
        });
    }
  }, [debouncedQuery, selectedCountry]);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setSearchQuery("");
  };

  const handleFavouriteToggle = async (uniId: number) => {
    const prevData = universityList;
    setUniversityList((prevList) =>
      prevList.map((data: University) => {
        return {
          ...data,
          isFavourite:
            data?.id === uniId ? !data.isFavourite : data.isFavourite,
        };
      })
    );
    const wasFavourite = prevData.filter((data) => data.id === uniId)[0]
      ?.isFavourite;

    try {
      const res = wasFavourite
        ? await removeFavorite(uniId)
        : await addFavorite(uniId);
      setApiStatus("success", setApiData)(res);
    } catch (error) {
      console.log(
        `Error while ${
          wasFavourite ? "removing" : "adding"
        } favourite university with id ${uniId}`,
        error
      );
      setApiStatus("error", setApiData)(error as FetchResult<unknown>);
      setUniversityList(prevData);
    }
  };

  return (
    <div className="app-container">
      <h2 tabIndex={1}>My Favourite Universities</h2>
      <div className="row-container">
        <CountryDropdown
          input={countryInput}
          setInput={setCountryInput}
          handleCountrySelect={handleCountrySelect}
        />
        <SearchInput
          value={searchQuery}
          id="search-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Enter University Name"
        />
      </div>
      <DataTable
        list={universityList}
        handleFavouriteToggle={handleFavouriteToggle}
      />
      <div className="btn-container">
        <Button
          text="Go To Favourites"
          onClick={() => navigate("/favourites")}
        />
        <Button
          text="Clear Filters"
          onClick={() => {
            setCountryInput("Canada");
            setSearchQuery("");
          }}
        />
      </div>
      <div>
        {!showApiDetails && (
          <Button
            text="Show API details"
            onClick={() => setShowApiDetails(true)}
            type="secondary"
          />
        )}
        {showApiDetails && (
          <div
            className={`api-details ${
              apiData.isError ? "error-div" : "success-div"
            }`}
          >
            {!apiData.endpoint ? (
              <p>No Api Details Available To Show</p>
            ) : (
              <>
                <p>
                  <b>Api endpoint:</b>
                  {apiData.endpoint}
                </p>
                <p>
                  <b>Response Code:</b>
                  {apiData.status}
                </p>
                <p>
                  <b>Response Time:</b>
                  {`${apiData.duration} ms`}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
