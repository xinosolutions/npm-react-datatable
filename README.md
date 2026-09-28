<div align="center">
  
  <img src="https://camo.githubusercontent.com/cfe32456bb3319eb01699f6e37171b62fdef7878a4370eaa899f7ba17457fa0f/68747470733a2f2f78696e6f736f6c7574696f6e732e636f6d2f6c6f676f732f78696e6f2d6c6f676f2e706e67" alt="XinoSolutions Logo" width="120" />
  
  # @xinosolutions/react-datatable
  
  A modern React DataTable with search, pagination, sorting, row selection, mobile card layout, and theming.
  
  [![npm version](https://img.shields.io/npm/v/@xinosolutions/react-datatable.svg)](https://www.npmjs.com/package/@xinosolutions/react-datatable)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
</div>

---

## About XinoSolutions

**XinoSolutions** is a software development company dedicated to creating high-quality, developer-friendly solutions. We specialize in building modern React components and tools that help developers build better applications faster.

This package is part of our open-source initiative to contribute valuable tools to the React ecosystem.

---

## Features

- **Real-time Search** — Pill search on the right (Tasks-style); local filter by default; `search={{ mode: "server", ... }}` when the API owns the query
- **Column Sorting** — Clickable headers with arrows; defaults to the first sortable column; table + column `disableSort` / `sortable` overrides
- **Toolbar filters** — Optional `toolbarLeft` for filter pills that share search height (`xs-datatable-toolbar-control`)
- **Pagination** — Bottom pager only; local by default; `pagination={{ mode: "server", ... }}` when the API returns one page at a time
- **Row Selection** — Multi-select (checkbox) or single-select (radio)
- **Customizable Columns** — Text, number, HTML, action menu or icon buttons, custom `render`
- **Mobile Layout** — Card/stack rows by default under 768px (`mobileLayout="table"` to keep the grid)
- **Sticky Header** — Enabled when `maxHeight` / `height` constrains the table body
- **Natural height** — Omit both height props for page-level vertical scroll (horizontal scroll only inside the table)
- **Sticky Columns** — Selection column stays visible while scrolling horizontally (or the first data column when selection is off)
- **Theme Customization** — Brand color via `--table-theme-color`
- **Empty & Loading States** — Clear empty and loading UI
- **TypeScript Types** — Bundled `index.d.ts`
- **Zero Runtime Dependencies** — Peer dependency on React only

---

## Installation

```bash
npm install @xinosolutions/react-datatable
```

---

## Quick Start

```jsx
import React, { useState } from 'react';
import { DataTable } from '@xinosolutions/react-datatable';

function App() {
  const [selected, setSelected] = useState([]);

  const rows = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
  ];

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

  return (
    <DataTable
      rows={rows}
      columns={columns}
      maxHeight={480}
      checkboxSelection={{
        selected,
        setSelected,
        selectBy: 'id',
      }}
    />
  );
}

export default App;
```

---

## Props

### DataTable Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `rows` | `Array<Object>` | Yes | `[]` | Row data. In `pagination.mode: "server"`, pass **only the current page** of rows (do not pass the full dataset). |
| `columns` | `Array<Column>` | Yes | `[]` | Column config |
| `pagination` | `Object` | No | See below | Client or server pagination. Default is client-side (`mode: "client"`). |
| `search` | `Object` | No | See below | Client or server search. Default is client-side (`mode: "client"`). |
| `sorting` | `Object` | No | See below | Client or server sorting. Default is client-side; sorts by the first sortable column. |
| `checkboxSelection` | `Object` | No | — | Selection config (checkbox or radio) |
| `theme` | `Object` | No | — | Theme CSS variables |
| `handleMenu` | `(row) => MenuItem[]` | No | — | Action items for `type: "action"` columns |
| `actionStyle` | `"menu" \| "buttons"` | No | `"menu"` | `"menu"`: 3-dot dropdown. `"buttons"`: inline colored icon buttons |
| `showSearch` | `boolean` | No | `true` | Show the search input (right side of toolbar) |
| `searchPlaceholder` | `string` | No | `"Search"` | Search placeholder |
| `toolbarLeft` | `ReactNode` | No | — | Optional left toolbar (filters). Match height with `xs-datatable-toolbar-control` or `var(--dt-control-height)` |
| `maxHeight` | `string \| number` | No | — | Max height of table body (enables sticky header + vertical scroll) |
| `height` | `string \| number` | No | — | Fixed height of table body (same sticky / vertical-scroll behavior) |
| `mobileLayout` | `"cards" \| "table"` | No | `"cards"` | Mobile (≤768px) layout mode |
| `sanitizeHtml` | `(html: string) => string` | No | — | Sanitizer for `type: "html"` cells |
| `loading` | `boolean` | No | `false` | Show loading state in the table body. In server mode the pager stays visible so the user can change page while a request is in flight. |

### Pagination Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | `"client" \| "server"` | `"client"` | `"client"`: table slices `rows` in the browser. `"server"`: `rows` is already one page; parent fetches and owns totals. |
| `showBottomPagination` | `boolean` | `true` | Show pagination below the table |
| `defaultPageSize` | `number` | `50` | Initial page size in client mode. Fallback in server mode if `pageSize` is omitted. |
| `pageSizeOptions` | `Array<number>` | `[10, 50, 100, 500]` | Values in the “per page” select. Include your current `pageSize`. |
| `totalCount` | `number` | — | **Required in server mode.** Total rows across all pages (not `rows.length`). |
| `page` | `number` | — | **Required in server mode.** Current page, **1-based** (`1` is the first page). |
| `pageSize` | `number` | — | **Required in server mode.** Controlled page size. |
| `onPageChange` | `(page: number) => void` | — | **Required in server mode.** Called with the next 1-based page. |
| `onPageSizeChange` | `(pageSize: number) => void` | — | **Required in server mode.** Called with the next page size. Reset `page` to `1` here. |

#### Client mode (`mode: "client"`, default)

Pass the full (or already-filtered) list as `rows`. The table searches, slices, and keeps page/size internally. `defaultPageSize` and `pageSizeOptions` are enough:

```jsx
<DataTable
  rows={allRows}
  columns={columns}
  pagination={{ defaultPageSize: 25, pageSizeOptions: [10, 25, 50] }}
/>
```

#### Server mode (`mode: "server"`)

Use this when the API returns one page at a time (same idea as `custom_pagination` on the older MUI table).

| You pass | Table does |
|----------|------------|
| `rows` = **current page only** | Renders them as-is (no second slice) |
| `totalCount` | Drives page count and “Showing X to Y of Z” |
| `page` (1-based) + `pageSize` | Controls the pager and `#` column (`(page - 1) * pageSize + index + 1`) |
| `onPageChange` / `onPageSizeChange` | Forwards clicks; does **not** keep its own page state |

`mode: "server"` is **opt-in**. Omit `pagination`, or pass only `defaultPageSize` / `pageSizeOptions` / show flags, and the table still slices `rows` locally like before.

This package is **1-based**. MUI `TablePagination` is **0-based**. If you migrate from `custom_pagination.page`, use `page + 1` when talking to DataTable, and `newPage` (already 1-based) when talking to your API if the API is 1-based — or convert explicitly.

Keep `page` in range when `totalCount` shrinks. The table does not clamp server page for you.

Typical fetch (pagination + search):

```jsx
const [page, setPage] = useState(1);       // 1-based
const [pageSize, setPageSize] = useState(50);
const [searchValue, setSearchValue] = useState('');
const [appliedSearch, setAppliedSearch] = useState('');
const [rows, setRows] = useState([]);
const [totalCount, setTotalCount] = useState(0);
const [loading, setLoading] = useState(false);

useEffect(() => {
  let cancelled = false;
  setLoading(true);

  fetchPage({ page, pageSize, search: appliedSearch }).then((result) => {
    if (cancelled) return;
    setRows(result.rows);           // one page
    setTotalCount(result.totalCount);
    setLoading(false);
  });

  return () => {
    cancelled = true;
  };
}, [page, pageSize, appliedSearch]);

<DataTable
  rows={rows}
  columns={columns}
  loading={loading}
  search={{
    mode: 'server',
    value: searchValue,
    onChange: setSearchValue,
    onSubmit: (value) => {
      setPage(1);
      setAppliedSearch(value);
    },
  }}
  pagination={{
    mode: 'server',
    totalCount,
    page,
    pageSize,
    onPageChange: setPage,
    onPageSizeChange: (nextSize) => {
      setPageSize(nextSize);
      setPage(1);
    },
    pageSizeOptions: [10, 50, 100, 500],
  }}
/>
```

If your API uses 0-based pages, convert at the boundary:

```jsx
fetchPage({ page: page - 1, limit: pageSize });
```

### Search Object

Same idea as pagination: client by default, `mode: "server"` when the API owns the query (replaces `custom_search` on the older MUI table).

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | `"client" \| "server"` | `"client"` | `"client"`: filter `rows` as the user types. `"server"`: controlled input; does **not** filter `rows`. |
| `value` | `string` | — | **Required in server mode.** Controlled input value. |
| `onChange` | `(value: string) => void` | — | **Required in server mode.** Called on each keystroke (and when Clear is clicked). |
| `onSubmit` | `(value: string) => void` | — | Optional. Enter key and a **Search** button. Typical: set `page` to `1` and refetch. If omitted, fetch from `onChange` (or a debounce) in the parent. |

`showSearch` / `searchPlaceholder` still control visibility and placeholder.

`mode: "server"` is **opt-in**. Omit the `search` prop entirely and search stays local (filters `rows` as the user types), including when pagination is in server mode.

#### Client mode (`search.mode: "client"`, default)

Omit `search`. The table keeps the query internally and filters `rows` locally.

#### Server mode (`search.mode: "server"`)

| You pass | Table does |
|----------|------------|
| `value` + `onChange` | Controlled input (type and Clear) |
| `onSubmit` (optional) | Enter + Search button; parent should refetch and reset page to `1` |
| Already-filtered `rows` | No second client-side filter |

Live search (fetch as the user types — debounce in the parent if needed):

```jsx
search={{
  mode: 'server',
  value: searchValue,
  onChange: (value) => {
    setSearchValue(value);
    setPage(1);
  },
}}
```

Submit-to-search (same pattern as `custom_search.handleSubmit`):

```jsx
search={{
  mode: 'server',
  value: searchValue,
  onChange: setSearchValue,
  onSubmit: (value) => {
    setPage(1);
    setAppliedSearch(value);
  },
}}
```

### Sorting Object

Sorting is **on by default**. The table sorts by the **first sortable column** (`asc`) unless you set `defaultSortBy`. Columns with a `key` are sortable; `type: "number"`, `type: "action"`, and `type: "html"` are not (opt in with `sortable: true` if needed).

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | `"client" \| "server"` | `"client"` | `"client"`: sort `rows` in the browser. `"server"`: controlled; parent owns fetch. |
| `disableSort` | `boolean` | `false` | Disable sorting for all columns (unless a column sets `sortable: true`). |
| `enabled` | `boolean` | `true` | When `false`, same as `disableSort: true`. |
| `hideSorting` | `boolean` | `false` | Hide sort arrows globally (column can override with `hideSorting: false`). |
| `defaultSortBy` | `string` | first sortable key | Initial sort column (client mode). |
| `defaultSortDirection` | `"asc" \| "desc"` | `"asc"` | Initial direction (client mode). |
| `sortBy` | `string` | — | **Server mode:** controlled sort column key. |
| `sortDirection` | `"asc" \| "desc"` | — | **Server mode:** controlled direction. |
| `onSortChange` | `(sortBy, sortDirection) => void` | — | Fires on every sort click (client and server). In server mode, parent should update `sortBy` / `sortDirection` and refetch. |

#### Table vs column overrides

Column options **always win**:

| Table | Column | Result |
|-------|--------|--------|
| `disableSort: true` | `sortable: true` | That column **is** sortable |
| sorting enabled | `disableSort: true` (or `sortable: false`) | That column **is not** sortable |

```jsx
// Disable sort everywhere, then enable Name only
<DataTable
  rows={rows}
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
  ]}
  sorting={{ disableSort: true }}
/>

// Enable sort everywhere, disable Email only
<DataTable
  rows={rows}
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email', disableSort: true },
  ]}
/>

// Hide arrows (click-to-sort still works unless disableSort)
<DataTable rows={rows} columns={columns} sorting={{ hideSorting: true }} />
```

#### Server mode

```jsx
const [sortBy, setSortBy] = useState('name');
const [sortDirection, setSortDirection] = useState('asc');

<DataTable
  rows={rows}
  columns={columns}
  sorting={{
    mode: 'server',
    sortBy,
    sortDirection,
    onSortChange: (nextBy, nextDir) => {
      setSortBy(nextBy);
      setSortDirection(nextDir);
      setPage(1);
    },
  }}
  pagination={{ mode: 'server', /* ... */ }}
/>
```

### CheckboxSelection Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `selected` | `Array<Object>` | Yes | Selected rows (0–1 items when `mode: "single"`) |
| `setSelected` | `Function` | Yes | State setter for selected rows |
| `selectBy` | `string` | No | Row id key (default `"_id"`) |
| `mode` | `"multiple" \| "single"` | No | `"multiple"` = checkboxes, `"single"` = radio (default `"multiple"`) |

### Theme Object

| Property | Type | Description |
|----------|------|-------------|
| `--table-theme-color` | `string` | Theme accent (default `#4FAFA0`) |

### Column Shape

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | Field name on the row |
| `label` | `string` | Header / card label |
| `type` | `"number" \| "html" \| "action"` | Special column types |
| `hideOnMobile` | `boolean` | Hide column under 768px |
| `render` | `(row, index) => ReactNode` | Custom cell renderer |
| `sortable` | `boolean` | Column sort override (wins over table `disableSort`) |
| `disableSort` | `boolean` | Disable sort for this column (`sortable: false`) |
| `hideSorting` | `boolean` | Hide sort arrows for this column |

---

## Column Types

### Standard / Number / Custom Render / Action

```jsx
const columns = [
  { label: '#', type: 'number' },
  { key: 'name', label: 'Name' },
  { key: 'phone', label: 'Phone', hideOnMobile: true },
  {
    label: 'Status',
    render: (row) => <strong>{row.status}</strong>,
  },
  { label: 'Actions', type: 'action' },
];

const handleMenu = (row) => [
  {
    label: 'Edit',
    icon: 'edit', // built-in name — or pass a custom React node
    tone: 'info', // used when actionStyle="buttons"
    onClick: () => edit(row),
  },
  {
    label: 'People',
    icon: 'people', // alias for "users"
    tone: 'neutral',
    onClick: () => openRoster(row),
  },
  {
    label: 'Delete',
    icon: 'delete', // alias for "trash"
    danger: true, // menu danger style; buttons use tone "danger"
    tone: 'danger',
    onClick: () => remove(row),
  },
];

{/* Default: 3-dot menu */}
<DataTable rows={rows} columns={columns} handleMenu={handleMenu} />

{/* Inline colored icon buttons */}
<DataTable
  rows={rows}
  columns={columns}
  handleMenu={handleMenu}
  actionStyle="buttons"
/>
```

Menu item shape: `{ label, icon?, danger?, tone?, emphasized?, disabled?, tooltip?, onClick? }`.

`icon` can be a **built-in name** (`"edit"`), an **alias** (`"delete"` → trash), or any **React node** (custom SVG / Iconify / emoji).

Button tones: `"neutral"` | `"info"` | `"success"` | `"warning"` | `"danger"`, **or any CSS color** (`"red"`, `"#0369a1"`, `"rgb(...)"`). Custom colors tint the button from that value. If `tone` is omitted, buttons use `"neutral"` (or `"danger"` when `danger` is true).

```jsx
{ label: 'Edit', icon: 'edit', tone: 'info', onClick: () => edit(row) }
{ label: 'Custom', icon: 'star', tone: '#7c3aed', onClick: () => star(row) }
{ label: 'Alert', icon: 'alert', tone: 'orange', onClick: () => alert(row) }
```

#### Built-in icons

Lucide-style outline icons (use the name as `icon: "..."`):

| Name | Also | Name | Also |
|------|------|------|------|
| `edit` | `pencil` | `trash` | `delete`, `remove` |
| `eye` | `view` | `eye-off` | |
| `users` | `people`, `group` | `user` | |
| `file` | `document`, `doc` | `copy` | `clone` |
| `download` | | `upload` | |
| `print` | | `search` | |
| `settings` | `gear`, `cog` | `filter` | |
| `plus` | `add` | `minus` | |
| `check` | | `x` | `close`, `cancel` |
| `refresh` | `reload`, `sync` | `link` | |
| `external-link` | `open` | `mail` | `email` |
| `phone` | | `calendar` | |
| `clock` | | `lock` | |
| `unlock` | | `star` | |
| `bookmark` | | `archive` | |
| `share` | | `info` | |
| `alert` | `warning` | `ban` | |
| `play` | | `pause` | |
| `duplicate` | | `clipboard` | |
| `tag` | | `image` | |
| `grid` | | `list` | |
| `more-horizontal` | | `more-vertical` | |
| `send` | | `save` | |
| `home` | | | |

You can also import `ActionIcon` / `ACTION_ICON_NAMES` from the package if you need the same icons outside the table.

### HTML Column

```jsx
<DataTable
  rows={rows}
  columns={[{ key: 'bio', label: 'Bio', type: 'html' }]}
  sanitizeHtml={(html) => yourSanitize(html)} // optional
/>
```

---

## Examples

### Natural height (horizontal scroll only)

Omit `maxHeight` / `height` so the table grows with its rows. The page scrolls vertically; the header is not sticky; only horizontal overflow stays inside the table.

```jsx
<DataTable
  rows={rows}
  columns={columns}
  // no maxHeight / height
/>
```

### Constrained height (sticky header + vertical scroll)

```jsx
<DataTable
  rows={rows}
  columns={columns}
  maxHeight={480}
/>
```

### Single-select (radio)

```jsx
<DataTable
  rows={rows}
  columns={columns}
  checkboxSelection={{
    selected,
    setSelected,
    selectBy: 'id',
    mode: 'single',
  }}
/>
```

### Force table layout on mobile

```jsx
<DataTable
  rows={rows}
  columns={columns}
  mobileLayout="table"
  maxHeight={400}
/>
```

### Server-side pagination and search

See [Server mode](#server-mode-mode-server) and [Search Object](#search-object). Minimal usage:

```jsx
<DataTable
  rows={currentPageRows}
  columns={columns}
  loading={loading}
  search={{
    mode: 'server',
    value: searchValue,
    onChange: setSearchValue,
    onSubmit: (value) => {
      setPage(1);
      setAppliedSearch(value);
    },
  }}
  pagination={{
    mode: 'server',
    totalCount,
    page,
    pageSize,
    onPageChange: setPage,
    onPageSizeChange: (nextSize) => {
      setPageSize(nextSize);
      setPage(1);
    },
  }}
/>
```

### Custom theme & chrome

```jsx
<DataTable
  showSearch
  searchPlaceholder="Find a customer…"
  rows={rows}
  columns={columns}
  theme={{ '--table-theme-color': '#3b82f6' }}
  pagination={{ defaultPageSize: 25, pageSizeOptions: [10, 25, 50] }}
/>
```

---

## Mobile behavior

- **≤768px + `mobileLayout="cards"` (default):** each row becomes a labeled card; actions (`actionStyle` menu or buttons) and selection sit in the card header.
- **≤768px + `mobileLayout="table"`:** keeps the grid with horizontal scroll, sticky selection/first column, and compact pagination (First/Last hidden; fewer page buttons).
- Columns with `hideOnMobile: true` are omitted on small screens in both modes.

---

## Requirements

- **React:** 16.8+ / 17+ / 18+ / 19+
- **React DOM:** 16.8+ / 17+ / 18+ / 19+

---

## Browser Support

- Chrome, Firefox, Safari, Edge (latest)

---

## License

MIT License — see [License](./License) file for details.

---

## Support

- [XinoSolutions](https://xinosolutions.com/)
- [NPM Package](https://www.npmjs.com/package/@xinosolutions/react-datatable)

---

<div align="center">
  <p><strong>Made by <a href="https://xinosolutions.com/">XinoSolutions</a></strong></p>
  <p>© 2026 XinoSolutions. All rights reserved.</p>
</div>
