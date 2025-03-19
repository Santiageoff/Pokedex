
import './Pagination.css'; // Importar el archivo CSS

interface Props {
  perPage: number;
  page: number;
  nextPage: () => void;
  previousPage: () => void;
  maxItems: number;
}

export const Pagination = ({
  perPage,
  page,
  nextPage,
  previousPage,
  maxItems,
}: Props) => {
  const lastPage = Math.ceil(maxItems / perPage);

  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={previousPage}
      >
        &lt;
      </button>
      <span>{page}</span>
      <button
        disabled={page === lastPage}
        onClick={nextPage}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;