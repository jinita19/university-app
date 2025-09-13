import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { useEffect, useState } from "react";
import {
  getFavouriteUniversities,
  removeFavorite,
} from "../services/favouriteUniService";
import "./FavouritesPage.css";
import { DataTable } from "../components/DataTable";
import type { University } from "../Types/universityTypes";

const FavouritesPage = () => {
  const navigate = useNavigate();
  const [favouriteUniList, setFavouriteUniList] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await getFavouriteUniversities();
        setFavouriteUniList(
          list.map((data: University) => {
            return {
              id: data.id,
              name: data.name,
              state_province: data.state_province,
              web_pages: data.web_pages,
              isFavourite: true,
            };
          })
        );
      } catch (error) {
        setError("Error fetching favourites list");
        console.error("Error fetching favourites:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRemoveRow = async (uniId: number) => {
    const prevData = favouriteUniList;
    setFavouriteUniList((prevList) =>
      prevList.filter((data: University) => data?.id !== uniId)
    );
    try {
      await removeFavorite(uniId);
    } catch (err) {
      console.log(
        `Error while removing favourite university with id ${uniId}`,
        err
      );
      setFavouriteUniList(prevData);
    }
  };

  return (
    <div className="app-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2 tabIndex={1}>My Favourite Universities</h2>
          <DataTable
            list={favouriteUniList}
            handleRemoveFavourite={handleRemoveRow}
            pageType="favourite"
          />
          <Button
            text="Back To Search"
            onClick={() => navigate("/search")}
            size="lg"
          />
        </>
      )}
    </div>
  );
};

export default FavouritesPage;
