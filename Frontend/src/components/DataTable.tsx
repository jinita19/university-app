import { useEffect, useState } from "react";
import { Pagination } from "./common/Pagination";
import { Button } from "./common/Button";
import "./DataTable.css";
import type { University } from "../Types/types";

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

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(0);
    }
  }, [totalPages, page]);

  const onPageLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  return (
    <>
      <div className="table-container">
        <table>
          <caption className="sr-only">List of universities</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">State/Province</th>
              <th scope="col">Web Pages</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {!list.length ? (
              <tr className="no-data-row">
                <td colSpan={4}>No Rows Available</td>
              </tr>
            ) : (
              list.slice(startIndex, endIndex).map((data: University) => {
                return (
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td className={!data.stateProvince ? "na" : ""}>
                      {data.stateProvince ?? "NA"}
                    </td>
                    <td>
                      {data.webPages?.map((link: string) => {
                        return (
                          <a
                            target="_blank"
                            key={`${data.id}-${link.toLowerCase()}`}
                            rel="noopener noreferrer"
                            className="link"
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
                          size="sm"
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
                          size="sm"
                          text={"Add To Favourites"}
                          ariaLabel={`Add ${data.name} to favourites`}
                          onClick={() => {
                            if (handleFavouriteToggle) {
                              handleFavouriteToggle(data.id);
                            }
                          }}
                        />
                      )}
                    </td>
                  </tr>
                );
              })
            )}
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
