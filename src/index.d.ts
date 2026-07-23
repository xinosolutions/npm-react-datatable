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
}

export interface PaginationConfig {
  showTopPagination?: boolean;
  showBottomPagination?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
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
  checkboxSelection?: CheckboxSelectionConfig<Row>;
  theme?: DataTableTheme;
  handleMenu?: (row: Row) => MenuItem<Row>[];
  title?: string | null;
  showSearch?: boolean;
  searchPlaceholder?: string;
  showResultCount?: boolean;
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
