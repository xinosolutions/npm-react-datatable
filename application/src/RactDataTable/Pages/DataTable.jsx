import React, { useState } from "react";
import styles from "../CSS/DataTable.module.css";
import Header from "../Components/Header";
import Checkbox from "../Components/HTML/Checkbox";
import Radio from "../Components/HTML/Radio";
import SearchIcon from "../Components/Icons/SearchIcon";
import ClearIcon from "../Components/Icons/ClearIcon";
import NoDataIcon from "../Components/Icons/NoDataIcon";

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
  const gridTemplateColumns = `repeat(${columns.length}, minmax(50px, auto))`;

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
                  style={{ gridColumn: `1 / -1`,}}
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
                  
                  if (col.render && typeof col.render === "function") {
                    tData = col.render(row, rowIndex);
                  } else if (col.type === "radio") {
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
