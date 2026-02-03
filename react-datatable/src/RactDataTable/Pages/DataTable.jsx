import React, { useState, useEffect, useMemo } from "react";
import styles from "../CSS/DataTable.module.css";
import Header from "../Components/Header";
import Checkbox from "../Components/HTML/Checkbox";
import SearchIcon from "../Components/Icons/SearchIcon";
import ClearIcon from "../Components/Icons/ClearIcon";
import NoDataIcon from "../Components/Icons/NoDataIcon";
import Pagination from "../Components/Pagination";

const DataTable = ({
  rows,
  columns,
  pagination,
  checkboxSelection,
  theme,
}) => {
  const {
    selected,
    setSelected,
    selectBy: selectByProp,
  } = checkboxSelection || {};

  const hasCheckboxSelection = checkboxSelection !== undefined &&
    checkboxSelection !== null &&
    selected !== undefined &&
    setSelected !== undefined;

  const selectBy = selectByProp !== undefined ? selectByProp : "_id";
  const {
    showTopPagination = true,
    showBottomPagination = true,
    defaultPageSize = 50,
    pageSizeOptions = [10, 50, 100, 500],
  } = pagination || {};

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const handleData = () => {
    if (!search.trim()) return rows;
    const searchLower = search.toLowerCase();
    return rows.filter((row) =>
      columns.some((col) => {
        if (col.key && row[col.key]) {
          const cellValue = String(row[col.key]);
          return cellValue.toLowerCase().includes(searchLower);
        }
        return false;
      }),
    );
  };

  const filteredRows = useMemo(() => handleData(), [rows, search, columns]);
  const gridTemplateColumns = hasCheckboxSelection
    ? `minmax(50px, auto) repeat(${columns.length}, minmax(50px, auto))`
    : `repeat(${columns.length}, minmax(50px, auto))`;

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  const totalRecords = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalRecords - 1);
  const paginatedRows = filteredRows.slice(startIndex, endIndex + 1);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  // Prepare theme styles
  const themeStyles = useMemo(() => {
    const stylesObj = {};
    if (theme && theme['--table-theme-color']) {
      stylesObj['--table-theme-color'] = theme['--table-theme-color'];
    }
    return stylesObj;
  }, [theme]);

  return (
    <div className={styles.userDetail} style={themeStyles}>
      <div className={styles.userDetailHead}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Search Table Data</h2>
          {rows.length > 0 && (
            <span className={styles.resultCount}>
              {filteredRows.length} of {rows.length} {filteredRows.length === 1 ? 'result' : 'results'}
            </span>
          )}
        </div>
        <div className={styles.searchContainer}>
          <input
            id="searchInput"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search table data"
          />
          <SearchIcon className={styles.searchIcon} />
          {search && (
            <button
              className={styles.clearButton}
              onClick={() => setSearch("")}
              aria-label="Clear search"
              type="button"
            >
              <ClearIcon />
            </button>
          )}
        </div>
      </div>
      {showTopPagination && totalRecords > 0 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            startIndex={startIndex}
            endIndex={endIndex}
            pageSizeOptions={pageSizeOptions}
          />
        </div>
      )}
      <div className={styles.userDetailTable}>
        <div
          className={styles.table}
          style={{
            gridTemplateColumns: gridTemplateColumns
          }}
        >
          <Header
            {...{
              columns,
              rows: paginatedRows,
              selected,
              setSelected,
              selectBy,
              hasCheckboxSelection
            }}
            gridTemplateColumns={gridTemplateColumns}
          />
          {filteredRows.length === 0 ? (
            rows.length === 0 ? (
              <div className={styles.tableRow}>
                <div
                  className={styles.noDataCell}
                  style={{ gridColumn: `1 / -1` }}
                >
                  <div className={styles.noDataContent}>
                    <NoDataIcon className={styles.noDataIcon} />
                    <h3 className={styles.noDataTitle}>No Data Available</h3>
                    <p className={styles.noDataMessage}>
                      There are no records to display. Add some data to get started.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.tableRow}>
                <div
                  className={`${styles.tableCell} ${styles.noDataFoundCell}`}
                  style={{ gridColumn: `1 / -1` }}
                >
                  No Data Found
                </div>
              </div>
            )
          ) : (
            paginatedRows.map((row, rowIndex) => {
              const actualRowIndex = startIndex + rowIndex;
              return (
                <div
                  key={actualRowIndex}
                  className={styles.tableRow}
                  data-row-index={actualRowIndex}
                >
                  {hasCheckboxSelection && (
                    <div
                      className={`${styles.tableCell} ${actualRowIndex % 2 === 1 ? styles.evenRow : ''}`}
                      data-row-index={actualRowIndex}
                    >
                      <Checkbox {...{ row, selected, setSelected, selectBy }} />
                    </div>
                  )}
                  {columns.map((col, colIndex) => {
                    let tData = null;

                    if (col.render && typeof col.render === "function") {
                      tData = col.render(row, actualRowIndex);
                    } else if (col.type === "number") {
                      tData = <span>{actualRowIndex + 1}</span>;
                    } else if (col.type === "html") {
                      tData = (
                        <div
                          dangerouslySetInnerHTML={{ __html: row[col.key] || '' }}
                        />
                      );
                    } else if (col.key && row[col.key] !== undefined) {
                      tData = <span>{row[col.key]}</span>;
                    } else {
                      tData = <span></span>;
                    }

                    return (
                      <div
                        key={col.key || `col-${colIndex}`}
                        className={`${styles.tableCell} ${actualRowIndex % 2 === 1 ? styles.evenRow : ''}`}
                        data-row-index={actualRowIndex}
                      >
                        {tData}
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </div>
      {showBottomPagination && totalRecords > 0 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalRecords={totalRecords}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            startIndex={startIndex}
            endIndex={endIndex}
            pageSizeOptions={pageSizeOptions}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;
