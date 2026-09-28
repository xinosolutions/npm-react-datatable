import { useState, useEffect, useMemo, useCallback } from "react";
import {
  getFirstSortableColumn,
  isColumnSortable,
  sortRows,
} from "./sorting";

/**
 * Client/server sorting state for DataTable.
 * Defaults to the first sortable column (asc) when sorting is enabled.
 */
export default function useTableSorting({
  sorting = {},
  columns = [],
  isServerPagination,
  setInternalPage,
}) {
  const {
    mode: sortingMode = "client",
    disableSort = false,
    enabled,
    hideSorting = false,
    defaultSortBy,
    defaultSortDirection = "asc",
    sortBy: serverSortBy,
    sortDirection: serverSortDirection,
    onSortChange,
  } = sorting || {};

  const isServerSorting = sortingMode === "server";
  const tableSorting = { disableSort, enabled, hideSorting };

  const firstSortable = useMemo(
    () => getFirstSortableColumn(columns, tableSorting),
    [columns, disableSort, enabled],
  );

  const resolvedDefaultKey =
    defaultSortBy &&
    columns.some(
      (col) => col.key === defaultSortBy && isColumnSortable(col, tableSorting),
    )
      ? defaultSortBy
      : firstSortable?.key;

  const [internalSortBy, setInternalSortBy] = useState(
    () => resolvedDefaultKey,
  );
  const [internalSortDirection, setInternalSortDirection] = useState(
    () => defaultSortDirection,
  );

  useEffect(() => {
    if (isServerSorting) return;
    if (!resolvedDefaultKey) {
      setInternalSortBy(undefined);
      return;
    }
    setInternalSortBy((prev) => {
      if (
        prev &&
        columns.some(
          (c) => c.key === prev && isColumnSortable(c, tableSorting),
        )
      ) {
        return prev;
      }
      return resolvedDefaultKey;
    });
  }, [resolvedDefaultKey, columns, isServerSorting, disableSort, enabled]);

  const sortBy = isServerSorting ? serverSortBy : internalSortBy;
  const sortDirection = isServerSorting
    ? (serverSortDirection ?? "asc")
    : internalSortDirection;

  const handleSort = useCallback(
    (columnKey) => {
      const nextDirection =
        sortBy === columnKey && sortDirection === "asc" ? "desc" : "asc";

      if (isServerSorting) {
        onSortChange?.(columnKey, nextDirection);
        return;
      }

      setInternalSortBy(columnKey);
      setInternalSortDirection(nextDirection);
      onSortChange?.(columnKey, nextDirection);
      if (!isServerPagination) {
        setInternalPage?.(1);
      }
    },
    [
      sortBy,
      sortDirection,
      isServerSorting,
      onSortChange,
      isServerPagination,
      setInternalPage,
    ],
  );

  const applyClientSort = useCallback(
    (rows) => {
      if (isServerSorting || !sortBy) return rows;
      const activeCol = columns.find((c) => c.key === sortBy);
      if (!activeCol || !isColumnSortable(activeCol, tableSorting)) {
        return rows;
      }
      return sortRows(rows, sortBy, sortDirection);
    },
    [isServerSorting, columns, sortBy, sortDirection, disableSort, enabled],
  );

  return {
    tableSorting,
    sortBy,
    sortDirection,
    handleSort,
    applyClientSort,
    isServerSorting,
  };
}
