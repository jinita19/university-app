import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { useEffect, useState } from "react";
import { getFavouriteUniversities, removeFavorite } from "../services/favouriteUniService";
import './FavouritesPage.css';
import { DataTable } from "../components/DataTable";

export type University = {
  id: number;
  name: string;
  state_province: string;
  web_pages: string[];
  isFavourite: boolean;
};

const FavouritesPage = () => {
  const navigate = useNavigate();
  const [favouriteUniList, setFavouriteUniList] = useState<University[]>([]);

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
        console.error("Error fetching favourites:", error);
      }
    };
    fetchData();
  }, []);

  const handleRemoveRow = async (uniId: number) => {
    const prevData = favouriteUniList;
    setFavouriteUniList(prevList => prevList.filter((data: University) => data?.id !== uniId));
    try {
        await removeFavorite(uniId);
    } catch (err) {
        console.log(`Error while removing favourite university with id ${uniId}`,err);
        setFavouriteUniList(prevData);
    }
  }

  return (
    <div className="app-container">
      <h2>My Favourite Universities</h2>
      <DataTable list={favouriteUniList} handleRemoveFavourite={handleRemoveRow} pageType="favourite"/>
      <Button text="Back To Search" onClick={() => navigate("/search")} size='lg'/>
    </div>
  );
};

export default FavouritesPage;
