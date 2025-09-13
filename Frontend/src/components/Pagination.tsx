import { Button } from "./common/Button";
import "./Pagination.css";

type PaginationProps = {
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
  onLimitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onLimitChange,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className="pagination">
      <select value={rowsPerPage} onChange={onLimitChange}>
        <option>5</option>
        <option>10</option>
        <option>15</option>
      </select>
      <Button
        text={`<< Prev`}
        onClick={onPrevClick}
        size="sm"
        disabled={currentPage === 0}
      />
      <span className="page-info">
        {currentPage + 1} of {totalPages}
      </span>
      <Button
        text={`Next >>`}
        onClick={onNextClick}
        size="sm"
        disabled={currentPage === totalPages - 1}
      />
    </div>
  );
};
