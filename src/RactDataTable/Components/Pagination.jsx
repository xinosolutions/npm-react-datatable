import React from "react";
import styles from "../CSS/DataTable.module.css";
import ChevronLeftIcon from "./Icons/ChevronLeftIcon";
import ChevronRightIcon from "./Icons/ChevronRightIcon";

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalRecords,
  onPageChange,
  onPageSizeChange,
  startIndex,
  endIndex,
  pageSizeOptions = [10, 25, 50, 100],
}) => {
  // Hide pagination if no records
  if (totalRecords === 0) {
    return null;
  }

  // Calculate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7; // Maximum number of page buttons to show

    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the start
      if (currentPage <= 3) {
        startPage = 2;
        endPage = 4;
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
        endPage = totalPages - 1;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }

      // Add pages around current
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handleFirst = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLast = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage && typeof page === "number") {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (e) => {
    const newPageSize = parseInt(e.target.value, 10);
    onPageSizeChange(newPageSize);
  };

  const isFirstDisabled = currentPage === 1;
  const isLastDisabled = currentPage === totalPages;
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        <span className={styles.recordsInfo}>
          Showing {startIndex + 1} to {endIndex + 1} of {totalRecords} records
        </span>
        {totalPages > 1 && (
          <span className={styles.pageInfo}>
            (Page {currentPage} of {totalPages})
          </span>
        )}
      </div>

      <div className={styles.paginationControls}>
        <div className={styles.pageNavigation}>
          <button
            className={styles.paginationButton}
            onClick={handleFirst}
            disabled={isFirstDisabled}
            aria-label="First page"
            type="button"
          >
            First
          </button>
          <button
            className={`${styles.paginationButton} ${styles.arrowButton}`}
            onClick={handlePrevious}
            disabled={isPreviousDisabled}
            aria-label="Previous page"
            type="button"
          >
            <ChevronLeftIcon className={styles.chevronIcon} />
          </button>

          <div className={styles.pageNumbers}>
            {pageNumbers.map((page, index) => {
              if (page === "ellipsis-start" || page === "ellipsis-end") {
                return (
                  <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                    ...
                  </span>
                );
              }

              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  className={`${styles.pageNumberButton} ${
                    isActive ? styles.activePage : ""
                  }`}
                  onClick={() => handlePageClick(page)}
                  disabled={isActive}
                  aria-label={`Go to page ${page}`}
                  aria-current={isActive ? "page" : undefined}
                  type="button"
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            className={`${styles.paginationButton} ${styles.arrowButton}`}
            onClick={handleNext}
            disabled={isNextDisabled}
            aria-label="Next page"
            type="button"
          >
            <ChevronRightIcon className={styles.chevronIcon} />
          </button>
          <button
            className={styles.paginationButton}
            onClick={handleLast}
            disabled={isLastDisabled}
            aria-label="Last page"
            type="button"
          >
            Last
          </button>
        </div>

        <div className={styles.pageSizeSelector}>
          <label htmlFor="pageSizeSelect" className={styles.pageSizeLabel}>
            Show:
          </label>
          <select
            id="pageSizeSelect"
            className={styles.pageSizeSelect}
            value={pageSize}
            onChange={handlePageSizeChange}
            aria-label="Items per page"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className={styles.pageSizeLabel}>per page</span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
