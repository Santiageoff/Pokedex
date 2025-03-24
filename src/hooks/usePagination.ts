import { useState, useEffect } from "react";

export const usePagination = (itemsPerPage: number, maxItems?: number) => {
  const storedPage = Number(localStorage.getItem("currentPage")) || 1;
  const [currentPage, setCurrentPage] = useState(storedPage);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const maxPages = maxItems ? Math.ceil(maxItems / itemsPerPage) : undefined;

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      maxPages ? Math.min(prevPage + 1, maxPages) : prevPage + 1
    );
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const backToHome = () => {
    setCurrentPage(1);
  };

  const changePage = (newPage: number) => {
    if (!maxPages || (newPage >= 1 && newPage <= maxPages)) {
      setCurrentPage(newPage);
    }
  };

  return {
    page: currentPage,
    nextPage,
    previousPage,
    backToHome,
    changePage,
    itemsPerPage,
  };
};

export default usePagination;
