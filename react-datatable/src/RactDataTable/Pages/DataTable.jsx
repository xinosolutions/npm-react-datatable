import React, { useState, useEffect, useMemo } from "react";
import styles from "../CSS/DataTable.module.css";
import Header from "../Components/Header";
import Checkbox from "../Components/HTML/Checkbox";
import Radio from "../Components/HTML/Radio";
import Pagination from "../Components/Pagination";

const DataTable = ({
  rows,
  columns,
  setSelected,
  selected,
  showTopPagination = true,
  showBottomPagination = true,
  defaultPageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
}) => {
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

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Reset to page 1 when pageSize changes
  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  // Calculate pagination values
  const totalRecords = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalRecords - 1);
  const paginatedRows = filteredRows.slice(startIndex, endIndex + 1);

  // Ensure currentPage is valid
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

  return (
    <div className={styles.userDetail}>
      <div className={styles.userDetailHead}>
        <label htmlFor="searchInput">Search Table Data</label>
        <div className={styles.searchContainer}>
          <input
            id="searchInput"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <img
            src="https://cdn.dribbble.com/userupload/20993779/file/original-955a1fae5634d26aa5126ce11a53c47d.gif"
            width={36}
            height={36}
            alt=""
          />
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
        <div className={styles.table}>
          <Header 
            {...{ columns, rows: paginatedRows, selected, setSelected }} 
            gridColumns={columns.length}
          />
          {filteredRows.length === 0 ? (
            <div 
              className={styles.tableRow}
              style={{ 
                gridTemplateColumns: `repeat(${columns.length}, auto)` 
              }}
            >
              <div
                className={styles.tableCell}
                style={{
                  gridColumn: `1 / -1`,
                  textAlign: "center",
                  fontWeight: "bold",
                  padding: "50px",
                }}
              >
                No Data Found
              </div>
            </div>
          ) : (
            paginatedRows.map((row, rowIndex) => {
              const actualRowIndex = startIndex + rowIndex;
              return (
                <div 
                  key={actualRowIndex} 
                  className={styles.tableRow}
                  style={{ 
                    gridTemplateColumns: `repeat(${columns.length}, auto)` 
                  }}
                >
                  {columns.map((col) => {
                    let tData = <span>{row[col.key]}</span>;
                    if (col.type === "radio") {
                      tData = <Radio {...{ row, col, selected }} />;
                    } else if (col.type === "checkbox") {
                      tData = (
                        <Checkbox {...{ col, row, selected, setSelected }} />
                      );
                    } else if (col.type === "number") {
                      tData = actualRowIndex + 1;
                    } else if (col.type === "html") {
                      tData = (
                        <div
                          dangerouslySetInnerHTML={{ __html: row[col.key] }}
                        />
                      );
                    }

                    return (
                      <div key={col.key} className={styles.tableCell}>
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
