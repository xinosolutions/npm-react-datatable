import React, { useState, useEffect, useMemo } from "react";
import styles from "../CSS/DataTable.module.css";
import Header from "../Components/Header";
import Checkbox from "../Components/HTML/Checkbox";
import Radio from "../Components/HTML/Radio";
import SearchIcon from "../Components/Icons/SearchIcon";
import ClearIcon from "../Components/Icons/ClearIcon";
import NoDataIcon from "../Components/Icons/NoDataIcon";
import Pagination from "../Components/Pagination";
import MenuDropdown from "../Components/MenuDropdown";
import { getRowKey } from "../utils/getRowId";
import useInstanceId from "../utils/useInstanceId";
import useMediaQuery from "../utils/useMediaQuery";

const DataTable = ({
  rows = [],
  columns = [],
  pagination,
  checkboxSelection,
  theme,
  handleMenu,
  title = "Search Table Data",
  showSearch = true,
  searchPlaceholder = "Search",
  showResultCount = true,
  maxHeight,
  height,
  mobileLayout = "cards",
  sanitizeHtml,
  loading = false,
}) => {
  const instanceId = useInstanceId("dt");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const useCards = isMobile && mobileLayout === "cards";

  const {
    selected,
    setSelected,
    selectBy: selectByProp,
    mode: selectionModeProp,
  } = checkboxSelection || {};

  const hasCheckboxSelection =
    checkboxSelection !== undefined &&
    checkboxSelection !== null &&
    selected !== undefined &&
    setSelected !== undefined;

  const selectionMode = selectionModeProp === "single" ? "single" : "multiple";
  const selectBy = selectByProp !== undefined ? selectByProp : "_id";
  const radioGroupName = `${instanceId}-row-selection`;

  const {
    showTopPagination = false,
    showBottomPagination = true,
    defaultPageSize = 50,
    pageSizeOptions = [10, 50, 100, 500],
  } = pagination || {};

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const visibleColumns = useMemo(() => {
    if (!isMobile) return columns;
    return columns.filter((col) => !col.hideOnMobile);
  }, [columns, isMobile]);

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const searchLower = search.toLowerCase();
    return rows.filter((row) =>
      columns.some((col) => {
        if (!col.key || row[col.key] === undefined || row[col.key] === null) {
          return false;
        }
        const cellValue = String(row[col.key]);
        return cellValue.toLowerCase().includes(searchLower);
      }),
    );
  }, [rows, search, columns]);

  /*
   * Single layout model (covers all reported width issues):
   * - `auto` tracks: size to content, then stretch equally to fill leftover
   *   (avoids fr quirks where the last column ate all free space)
   * - table uses width: max(100%, max-content) in CSS for full width + scroll
   * - only the selection column is sticky (see cell classNames below)
   */
  const gridTemplateColumns = hasCheckboxSelection
    ? `52px repeat(${visibleColumns.length}, auto)`
    : `repeat(${visibleColumns.length}, auto)`;

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

  const themeStyles = useMemo(() => {
    const stylesObj = {};
    if (theme && theme["--table-theme-color"]) {
      stylesObj["--table-theme-color"] = theme["--table-theme-color"];
    }
    return stylesObj;
  }, [theme]);

  const constrainBody = maxHeight != null || height != null;

  const tableBodyStyle = useMemo(() => {
    const style = {};
    if (maxHeight != null) style.maxHeight = maxHeight;
    if (height != null) style.height = height;
    return style;
  }, [maxHeight, height]);

  const searchInputId = `${instanceId}-searchInput`;

  const renderCellContent = (col, row, actualRowIndex) => {
    if (col.type === "action") {
      const menuItems = handleMenu ? handleMenu(row) : [];
      return (
        <MenuDropdown
          menuItems={menuItems}
          row={row}
          rowIndex={actualRowIndex}
        />
      );
    }
    if (col.render && typeof col.render === "function") {
      return col.render(row, actualRowIndex);
    }
    if (col.type === "number") {
      return <span className={styles.cellText}>{actualRowIndex + 1}</span>;
    }
    if (col.type === "html") {
      const raw = row[col.key] || "";
      const html =
        typeof sanitizeHtml === "function" ? sanitizeHtml(raw) : raw;
      return (
        <div
          className={styles.htmlCell}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
    if (col.key && row[col.key] !== undefined) {
      return <span className={styles.cellText}>{row[col.key]}</span>;
    }
    return <span className={styles.cellText}></span>;
  };

  const renderSelectionControl = (row) => {
    if (!hasCheckboxSelection) return null;
    if (selectionMode === "single") {
      return (
        <Radio
          row={row}
          selected={selected}
          setSelected={setSelected}
          selectBy={selectBy}
          name={radioGroupName}
        />
      );
    }
    return (
      <Checkbox
        row={row}
        selected={selected}
        setSelected={setSelected}
        selectBy={selectBy}
      />
    );
  };

  const renderEmptyState = (isSearchEmpty) => (
    <div className={useCards ? styles.cardsEmpty : styles.tableRow}>
      <div
        className={styles.noDataCell}
        style={useCards ? undefined : { gridColumn: "1 / -1" }}
      >
        <div className={styles.noDataContent}>
          <NoDataIcon className={styles.noDataIcon} />
          <h3 className={styles.noDataTitle}>
            {isSearchEmpty ? "No Data Found" : "No Data Available"}
          </h3>
          <p className={styles.noDataMessage}>
            {isSearchEmpty
              ? "No records match your search. Try a different query."
              : "There are no records to display. Add some data to get started."}
          </p>
        </div>
      </div>
    </div>
  );

  const renderLoadingState = () => (
    <div className={useCards ? styles.cardsEmpty : styles.tableRow}>
      <div
        className={styles.noDataCell}
        style={useCards ? undefined : { gridColumn: "1 / -1" }}
      >
        <div className={styles.noDataContent}>
          <p className={styles.loadingMessage}>Loading…</p>
        </div>
      </div>
    </div>
  );

  const renderCardRows = () => {
    if (loading) return renderLoadingState();
    if (filteredRows.length === 0) {
      return renderEmptyState(rows.length > 0);
    }

    return paginatedRows.map((row, rowIndex) => {
      const actualRowIndex = startIndex + rowIndex;
      const rowKey = getRowKey(row, selectBy, actualRowIndex);
      const actionCol = visibleColumns.find((c) => c.type === "action");
      const fieldColumns = visibleColumns.filter((c) => c.type !== "action");

      return (
        <div key={rowKey} className={styles.mobileCard}>
          <div className={styles.mobileCardHeader}>
            <div className={styles.mobileCardHeaderLeft}>
              {renderSelectionControl(row)}
              {fieldColumns.some((c) => c.type === "number") && (
                <span className={styles.mobileCardBadge}>
                  #{actualRowIndex + 1}
                </span>
              )}
            </div>
            {actionCol && (
              <MenuDropdown
                menuItems={handleMenu ? handleMenu(row) : []}
                row={row}
                rowIndex={actualRowIndex}
              />
            )}
          </div>
          <div className={styles.mobileCardBody}>
            {fieldColumns
              .filter((c) => c.type !== "number")
              .map((col, colIndex) => (
                <div
                  key={col.key || `card-col-${colIndex}`}
                  className={styles.mobileCardField}
                >
                  <span className={styles.mobileCardLabel}>{col.label}</span>
                  <div className={styles.mobileCardValue}>
                    {renderCellContent(col, row, actualRowIndex)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
    });
  };

  const renderTableRows = () => {
    if (loading) return renderLoadingState();
    if (filteredRows.length === 0) {
      return renderEmptyState(rows.length > 0);
    }

    return paginatedRows.map((row, rowIndex) => {
      const actualRowIndex = startIndex + rowIndex;
      const rowKey = getRowKey(row, selectBy, actualRowIndex);

      return (
        <div
          key={rowKey}
          className={styles.tableRow}
          data-row-index={actualRowIndex}
        >
          {hasCheckboxSelection && (
            <div
              className={`${styles.tableCell} ${styles.stickyCol} ${styles.selectionCell} ${
                actualRowIndex % 2 === 1 ? styles.evenRow : ""
              }`}
              data-row-index={actualRowIndex}
            >
              {renderSelectionControl(row)}
            </div>
          )}
          {visibleColumns.map((col, colIndex) => {
            // Only stick the first data column when there is no selection column
            // (selection is already sticky). Avoids a gap between checkbox and "#".
            const stickyFirst =
              !hasCheckboxSelection && colIndex === 0
                ? styles.stickyColFirst
                : "";
            return (
              <div
                key={col.key || `col-${colIndex}`}
                className={`${styles.tableCell} ${
                  col.type === "action" ? styles.actionCell : ""
                } ${stickyFirst} ${
                  actualRowIndex % 2 === 1 ? styles.evenRow : ""
                }`}
                data-row-index={actualRowIndex}
              >
                {renderCellContent(col, row, actualRowIndex)}
              </div>
            );
          })}
        </div>
      );
    });
  };

  const paginationProps = {
    currentPage,
    totalPages,
    pageSize,
    totalRecords,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
    startIndex,
    endIndex,
    pageSizeOptions,
    instanceId,
  };

  return (
    <div className={styles.userDetail} style={themeStyles}>
      <div className={styles.userDetailHead}>
        <div className={styles.titleSection}>
          {title ? <h2 className={styles.title}>{title}</h2> : null}
          {showResultCount && rows.length > 0 && (
            <span className={styles.resultCount}>
              {filteredRows.length} of {rows.length}{" "}
              {filteredRows.length === 1 ? "result" : "results"}
            </span>
          )}
        </div>
        {showSearch && (
          <div className={styles.searchContainer}>
            <input
              id={searchInputId}
              type="text"
              placeholder={searchPlaceholder}
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
        )}
      </div>

      {showTopPagination && totalRecords > 0 && !loading && (
        <div className={styles.paginationWrapper}>
          <Pagination {...paginationProps} instanceId={`${instanceId}-top`} />
        </div>
      )}

      <div
        className={`${styles.userDetailTable} ${
          constrainBody
            ? styles.userDetailTableConstrained
            : styles.userDetailTableNatural
        }`}
        style={tableBodyStyle}
      >
        {useCards ? (
          <div className={styles.mobileCards}>{renderCardRows()}</div>
        ) : (
          <div
            className={styles.table}
            style={{ gridTemplateColumns }}
          >
            <Header
              columns={visibleColumns}
              rows={paginatedRows}
              selected={selected}
              setSelected={setSelected}
              selectBy={selectBy}
              hasCheckboxSelection={hasCheckboxSelection}
              selectionMode={selectionMode}
            />
            {renderTableRows()}
          </div>
        )}
      </div>

      {showBottomPagination && totalRecords > 0 && !loading && (
        <div
          className={`${styles.paginationWrapper} ${styles.paginationWrapperBottom}`}
        >
          <Pagination
            {...paginationProps}
            instanceId={`${instanceId}-bottom`}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;
