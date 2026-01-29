import React, { useState } from "react";
import styles from "../CSS/DataTable.module.css";
import Header from "../Components/Header";
import Checkbox from "../Components/HTML/Checkbox";
import Radio from "../Components/HTML/Radio";

const DataTable = ({ rows, columns, setSelected, selected }) => {
  const [search, setSearch] = useState("");

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

  const filteredRows = handleData();
  const gridTemplateColumns = `repeat(${columns.length}, auto)`;

  return (
    <div className={styles.userDetail}>
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
            placeholder="Search across all columns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search table data"
          />
          <svg
            className={styles.searchIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          {search && (
            <button
              className={styles.clearButton}
              onClick={() => setSearch("")}
              aria-label="Clear search"
              type="button"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className={styles.userDetailTable}>
        <div 
          className={styles.table}
          style={{ 
            gridTemplateColumns: gridTemplateColumns
          }}
        >
          <Header 
            {...{ columns, rows, selected, setSelected }} 
            gridTemplateColumns={gridTemplateColumns}
          />
          {filteredRows.length === 0 ? (
            rows.length === 0 ? (
              <div className={styles.tableRow}>
                <div className={styles.noDataCell}>
                  <div className={styles.noDataContent}>
                    <svg
                      className={styles.noDataIcon}
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="12" y1="18" x2="12" y2="12"></line>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
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
            )
          ) : (
            filteredRows.map((row, rowIndex) => (
              <div 
                key={rowIndex} 
                className={styles.tableRow}
                data-row-index={rowIndex}
              >
                {columns.map((col, colIndex) => {
                  let tData = null;
                  
                  if (col.type === "radio") {
                    tData = <Radio {...{ row, col, selected }} />;
                  } else if (col.type === "checkbox") {
                    tData = (
                      <Checkbox {...{ col, row, selected, setSelected }} />
                    );
                  } else if (col.type === "number") {
                    tData = <span>{rowIndex + 1}</span>;
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
                      className={`${styles.tableCell} ${rowIndex % 2 === 1 ? styles.evenRow : ''}`}
                      data-row-index={rowIndex}
                    >
                      {tData}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
