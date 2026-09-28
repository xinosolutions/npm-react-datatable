import type {
  CSSProperties,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
} from "react";

export type SelectionMode = "single" | "multiple";

export type MobileLayout = "cards" | "table";

export interface DataTableColumn<Row = Record<string, unknown>> {
  key?: string;
  label?: string;
  type?: "number" | "html" | "action" | string;
  hideOnMobile?: boolean;
  render?: (row: Row, index: number) => ReactNode;
  /**
   * Column-level sort override. Wins over table `sorting.disableSort`
   * and over default exclusions (`action`, `number`, `html`).
   * `true` enables sort even when the table/type would disable it.
   * `false` disables sort even when the table has sorting enabled.
   */
  sortable?: boolean;
  /** Same as `sortable: false`. Wins over table-level enable. */
  disableSort?: boolean;
  /** Hide sort arrows for this column (column still sortable unless disabled). */
  hideSorting?: boolean;
}

export type PaginationMode = "client" | "server";

export type SearchMode = "client" | "server";

export type SortingMode = "client" | "server";

export type SortDirection = "asc" | "desc";

export interface SortingConfig {
  /**
   * `"client"` (default): sort `rows` locally.
   * `"server"`: controlled sort; parent owns fetch. Does not sort `rows`.
   */
  mode?: SortingMode;
  /**
   * When `true`, sorting is off for all columns unless a column sets
   * `sortable: true` (or `disableSort: false`).
   */
  disableSort?: boolean;
  /**
   * When `false`, same as `disableSort: true`. Default is enabled.
   */
  enabled?: boolean;
  /** Hide sort arrows globally (columns can override with `hideSorting: false`). */
  hideSorting?: boolean;
  /** Initial sort column key (client mode). Defaults to the first sortable column. */
  defaultSortBy?: string;
  /** Initial sort direction (client mode). Default `"asc"`. */
  defaultSortDirection?: SortDirection;
  /** Server mode: controlled sort column key. */
  sortBy?: string;
  /** Server mode: controlled sort direction. */
  sortDirection?: SortDirection;
  /** Called whenever the user clicks a sortable header (client and server). */
  onSortChange?: (sortBy: string, sortDirection: SortDirection) => void;
}

export interface SearchConfig {
  /**
   * `"client"` (default): filter `rows` locally as the user types.
   * `"server"`: controlled input; parent owns fetch. Does not filter `rows`.
   */
  mode?: SearchMode;
  /** Server mode: controlled input value. */
  value?: string;
  onChange?: (value: string) => void;
  /**
   * Optional. Enter key and a Search button.
   * Typical: refetch and reset `pagination.page` to `1`.
   * If omitted, fetch from `onChange` (or a debounce) in the parent.
   */
  onSubmit?: (value: string) => void;
}

export interface PaginationConfig {
  /**
   * `"client"` (default) slices `rows` locally.
   * `"server"` treats `rows` as the current page; parent owns fetch + totals.
   */
  mode?: PaginationMode;
  showBottomPagination?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  /** Server mode: total rows across all pages. */
  totalCount?: number;
  /** Server mode: 1-based current page. */
  page?: number;
  /** Server mode: controlled page size. */
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export interface CheckboxSelectionConfig<Row = Record<string, unknown>> {
  selected: Row[];
  setSelected: Dispatch<SetStateAction<Row[]>>;
  selectBy?: string;
  /** `"multiple"` (checkbox) or `"single"` (radio). Default: `"multiple"`. */
  mode?: SelectionMode;
}

export interface DataTableTheme {
  "--table-theme-color"?: string;
}

export interface MenuItem<Row = Record<string, unknown>> {
  label: ReactNode;
  /** Optional icon (SVG, emoji, or any React node) shown before the label. */
  icon?: ReactNode;
  /** Renders the item in a destructive/danger style. */
  danger?: boolean;
  onClick?: (row: Row, rowIndex: number) => void;
}

export interface DataTableProps<Row = Record<string, unknown>> {
  rows: Row[];
  columns: DataTableColumn<Row>[];
  pagination?: PaginationConfig;
  search?: SearchConfig;
  /** Sorting config. Default is client-side, sorted by the first sortable column. */
  sorting?: SortingConfig;
  checkboxSelection?: CheckboxSelectionConfig<Row>;
  theme?: DataTableTheme;
  handleMenu?: (row: Row) => MenuItem<Row>[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  /**
   * Optional left-side toolbar content (e.g. filter pills).
   * Placed in the same row as search; use height `var(--dt-control-height)`
   * or class `xs-datatable-toolbar-control` so controls match search height.
   */
  toolbarLeft?: ReactNode;
  /**
   * Constrain table body height. When set (with or without `height`), enables
   * sticky header + internal vertical scroll. Omit both for natural height:
   * page scrolls vertically; only horizontal scroll stays inside the table.
   */
  maxHeight?: CSSProperties["maxHeight"];
  /** Fixed table body height (same sticky / vertical-scroll behavior as `maxHeight`). */
  height?: CSSProperties["height"];
  /**
   * On viewports ≤768px: `"cards"` (default) stacks rows as labeled cards;
   * `"table"` keeps the grid with sticky columns + horizontal scroll.
   */
  mobileLayout?: MobileLayout;
  /**
   * Optional sanitizer for `type: "html"` cells.
   * Without this, HTML is rendered as-is (XSS risk if content is untrusted).
   */
  sanitizeHtml?: (html: string) => string;
  loading?: boolean;
}

declare const DataTable: <Row = Record<string, unknown>>(
  props: DataTableProps<Row>,
) => ReactElement | null;

export { DataTable };
export default DataTable;
