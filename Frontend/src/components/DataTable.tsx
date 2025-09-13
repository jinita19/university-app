import { useState } from "react";
import type { University } from "../views/FavouritesPage";
import { Pagination } from "./Pagination";
import { Button } from "./common/Button";
import "./DataTable.css";

type DataTableProps = {
  list: University[];
  handleFavouriteToggle?: (uniId: number) => void;
  handleRemoveFavourite?: (uniId: number) => void;
  pageType?: "search" | "favourite";
};

export const DataTable: React.FC<DataTableProps> = ({
  list,
  handleFavouriteToggle,
  handleRemoveFavourite,
  pageType = "search",
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const totalPages = Math.max(1, Math.ceil(list.length / +rowsPerPage));
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const onPageLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>State/Province</th>
              <th>Web Pages</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.slice(startIndex, endIndex).map((data: University) => {
              return (
                <tr key={data.id}>
                  <td>{data.name}</td>
                  <td className={!data.state_province ? "na" : ""}>
                    {data.state_province ?? "NA"}
                  </td>
                  <td>
                    {data.web_pages.map((link: string) => {
                      return (
                        <a target="_blank" href={link}>
                          {link}
                        </a>
                      );
                    })}
                  </td>
                  <td>
                    {data.isFavourite ? (
                      <Button
                        text={"Remove From Favourites"}
                        type="secondary"
                        onClick={() => {
                          if (pageType === "search") {
                            if (handleFavouriteToggle) {
                              handleFavouriteToggle(data.id);
                            }
                          } else if (handleRemoveFavourite) {
                            handleRemoveFavourite(data.id);
                          }
                        }}
                      />
                    ) : (
                      <Button text={"Add To Favourites"} onClick={() => {}} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onLimitChange={onPageLimitChange}
        onNextClick={() => setPage((prev: number) => prev + 1)}
        onPrevClick={() => setPage((prev: number) => prev - 1)}
      />
    </>
  );
};
