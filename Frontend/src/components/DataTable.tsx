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
          <caption>List of universities</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">State/Province</th>
              <th scope="col">Web Pages</th>
              <th scope="col"></th>
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
                        <a
                          target="_blank"
                          key={data.name}
                          rel="noopener noreferrer"
                          aria-label={`Visit ${data.name} website`}
                          href={link}
                        >
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
                        ariaLabel={`Remove ${data.name} from favourites`}
                      />
                    ) : (
                      <Button
                        text={"Add To Favourites"}
                        ariaLabel={`Add ${data.name} to favourites`}
                        onClick={() => {}}
                      />
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
