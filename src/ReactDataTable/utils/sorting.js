/**
 * Column types that are UI-only or non-comparable by default.
 * Opt in per column with `sortable: true` when a meaningful `key` exists.
 */
const NON_SORTABLE_TYPES = new Set(["action", "number", "html"]);

/**
 * Resolve whether a column is sortable.
 * Column overrides win over the table-level `disableSort` / `enabled` flag.
 */
export function isColumnSortable(col, sorting = {}) {
  if (!col || !col.key) return false;

  const tableDisabled =
    sorting.disableSort === true || sorting.enabled === false;

  // Explicit column override always wins (even for html / etc.)
  if (col.sortable === true || col.disableSort === false) return true;
  if (col.sortable === false || col.disableSort === true) return false;

  if (NON_SORTABLE_TYPES.has(col.type)) return false;

  return !tableDisabled;
}

/** Whether sort arrow icons should render for a column. */
export function shouldShowSortIcon(col, sorting = {}, sortable) {
  if (!sortable) return false;
  if (col.hideSorting === true) return false;
  if (col.hideSorting === false) return true;
  return sorting.hideSorting !== true;
}

export function getFirstSortableColumn(columns, sorting = {}) {
  return columns.find((col) => isColumnSortable(col, sorting)) || null;
}

function toComparable(value) {
  if (value == null) return "";
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (value instanceof Date) return value.getTime();

  const str = String(value).trim();
  const asNum = Number(str);
  if (str !== "" && !Number.isNaN(asNum) && /^-?\d+(\.\d+)?$/.test(str)) {
    return asNum;
  }

  const asDate = Date.parse(str);
  if (!Number.isNaN(asDate) && /^\d{4}-\d{2}-\d{2}/.test(str)) {
    return asDate;
  }

  return str.toLowerCase();
}

export function compareValues(a, b) {
  const av = toComparable(a);
  const bv = toComparable(b);

  if (av === "" && bv !== "") return 1;
  if (bv === "" && av !== "") return -1;
  if (av < bv) return -1;
  if (av > bv) return 1;
  return 0;
}

export function sortRows(rows, sortBy, sortDirection = "asc") {
  if (!sortBy || !Array.isArray(rows)) return rows;

  const dir = sortDirection === "desc" ? -1 : 1;
  return [...rows].sort((rowA, rowB) => {
    const result = compareValues(rowA?.[sortBy], rowB?.[sortBy]);
    return result * dir;
  });
}
