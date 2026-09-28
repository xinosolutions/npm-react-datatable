import React, { useState, useEffect, useMemo } from "react";
import styles from "../CSS/DataTable.module.css";
import Header from "../Components/Header";
import Toolbar from "../Components/Toolbar";
import TableBody from "../Components/TableBody";
import Pagination from "../Components/Pagination";
import useInstanceId from "../utils/useInstanceId";
import useMediaQuery from "../utils/useMediaQuery";
import useTableSorting from "../utils/useTableSorting";

const DataTable = ({
  rows = [],
  columns = [],
  pagination,
  search: searchConfig,
  sorting: sortingConfig,
  checkboxSelection,
  theme,
  handleMenu,
  /** `"menu"` (default 3-dot) or `"buttons"` (inline colored icon actions). */
  actionStyle = "menu",
  showSearch = true,
  searchPlaceholder = "Search",
  /** Optional left-side toolbar content (filters). Shares control height with search. */
  toolbarLeft = null,
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
    mode: paginationMode = "client",
    showBottomPagination = true,
    defaultPageSize = 50,
    pageSizeOptions = [10, 50, 100, 500],
    totalCount: serverTotalCount,
    page: serverPage,
    pageSize: serverPageSize,
    onPageChange: onServerPageChange,
    onPageSizeChange: onServerPageSizeChange,
  } = pagination || {};

  const isServerPagination = paginationMode === "server";

  const {
    mode: searchMode = "client",
    value: serverSearchValue,
    onChange: onServerSearchChange,
    onSubmit: onServerSearchSubmit,
  } = searchConfig || {};

  const isServerSearch = searchMode === "server";

  const [internalSearch, setInternalSearch] = useState("");
  const [internalPage, setInternalPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);

  const pageSize = isServerPagination
    ? (serverPageSize ?? defaultPageSize)
    : internalPageSize;
  const safePageSize = pageSize > 0 ? pageSize : defaultPageSize;
  const currentPage = isServerPagination ? (serverPage ?? 1) : internalPage;
  const resolvedPageSizeOptions = pageSizeOptions.includes(safePageSize)
    ? pageSizeOptions
    : [...pageSizeOptions, safePageSize].sort((a, b) => a - b);

  const visibleColumns = useMemo(() => {
    if (!isMobile) return columns;
    return columns.filter((col) => !col.hideOnMobile);
  }, [columns, isMobile]);

  const searchValue = isServerSearch
    ? (serverSearchValue ?? "")
    : internalSearch;

  const {
    tableSorting,
    sortBy,
    sortDirection,
    handleSort,
    applyClientSort,
  } = useTableSorting({
    sorting: sortingConfig,
    columns,
    isServerPagination,
    setInternalPage,
  });

  const filteredRows = useMemo(() => {
    if (isServerSearch) return rows;
    if (!searchValue.trim()) return rows;
    const searchLower = searchValue.toLowerCase();
    return rows.filter((row) =>
      columns.some((col) => {
        if (!col.key || row[col.key] === undefined || row[col.key] === null) {
          return false;
        }
        const cellValue = String(row[col.key]);
        return cellValue.toLowerCase().includes(searchLower);
      }),
    );
  }, [rows, searchValue, columns, isServerSearch]);

  const sortedRows = useMemo(
    () => applyClientSort(filteredRows),
    [filteredRows, applyClientSort],
  );

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
    if (isServerPagination || isServerSearch) return;
    setInternalPage(1);
  }, [searchValue, isServerPagination, isServerSearch]);

  useEffect(() => {
    if (isServerPagination) return;
    setInternalPage(1);
  }, [safePageSize, isServerPagination]);

  const totalRecords = isServerPagination
    ? (serverTotalCount ?? 0)
    : sortedRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / safePageSize) || 1);
  const startIndex = (currentPage - 1) * safePageSize;
  const pageRowCount = isServerPagination
    ? sortedRows.length
    : Math.min(safePageSize, Math.max(0, totalRecords - startIndex));
  const endIndex =
    pageRowCount === 0 ? startIndex : startIndex + pageRowCount - 1;
  const paginatedRows = isServerPagination
    ? sortedRows
    : sortedRows.slice(startIndex, endIndex + 1);

  useEffect(() => {
    if (isServerPagination) return;
    if (currentPage > totalPages && totalPages > 0) {
      setInternalPage(totalPages);
    }
  }, [currentPage, totalPages, isServerPagination]);

  const handlePageChange = (page) => {
    if (isServerPagination) {
      onServerPageChange?.(page);
      return;
    }
    setInternalPage(page);
  };

  const handlePageSizeChange = (newPageSize) => {
    if (isServerPagination) {
      onServerPageSizeChange?.(newPageSize);
      return;
    }
    setInternalPageSize(newPageSize);
  };

  const handleSearchChange = (nextValue) => {
    if (isServerSearch) {
      onServerSearchChange?.(nextValue);
      return;
    }
    setInternalSearch(nextValue);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (isServerSearch) {
      onServerSearchSubmit?.(searchValue);
    }
  };

  const handleSearchClear = () => {
    handleSearchChange("");
  };

  const isEmptyFromSearch = isServerSearch
    ? searchValue.trim().length > 0
    : rows.length > 0;

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

  const paginationProps = {
    currentPage,
    totalPages,
    pageSize: safePageSize,
    totalRecords,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
    startIndex,
    endIndex,
    pageSizeOptions: resolvedPageSizeOptions,
    instanceId,
  };

  const showPaginationBar = totalRecords > 0 && (!loading || isServerPagination);

  const bodyProps = {
    useCards,
    loading,
    filteredRows: sortedRows,
    paginatedRows,
    visibleColumns,
    startIndex,
    isEmptyFromSearch,
    hasCheckboxSelection,
    selectionMode,
    selected,
    setSelected,
    selectBy,
    radioGroupName,
    handleMenu,
    actionStyle: actionStyle === "buttons" ? "buttons" : "menu",
    sanitizeHtml,
  };

  return (
    <div className={styles.userDetail} style={themeStyles}>
      <Toolbar
        toolbarLeft={toolbarLeft}
        showSearch={showSearch}
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        searchInputId={searchInputId}
        isServerSearch={isServerSearch}
        showSubmitButton={Boolean(onServerSearchSubmit)}
        onSearchChange={handleSearchChange}
        onSearchClear={handleSearchClear}
        onSearchSubmit={handleSearchSubmit}
      />

      <div
        className={`${styles.userDetailTable} ${
          constrainBody
            ? styles.userDetailTableConstrained
            : styles.userDetailTableNatural
        }`}
        style={tableBodyStyle}
      >
        {useCards ? (
          <div className={styles.mobileCards}>
            <TableBody {...bodyProps} />
          </div>
        ) : (
          <div className={styles.table} style={{ gridTemplateColumns }}>
            <Header
              columns={visibleColumns}
              rows={paginatedRows}
              selected={selected}
              setSelected={setSelected}
              selectBy={selectBy}
              hasCheckboxSelection={hasCheckboxSelection}
              selectionMode={selectionMode}
              sorting={tableSorting}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            <TableBody {...bodyProps} />
          </div>
        )}
      </div>

      {showBottomPagination && showPaginationBar && (
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
