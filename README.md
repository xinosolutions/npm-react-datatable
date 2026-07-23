<div align="center">
  
  <img src="https://camo.githubusercontent.com/cfe32456bb3319eb01699f6e37171b62fdef7878a4370eaa899f7ba17457fa0f/68747470733a2f2f78696e6f736f6c7574696f6e732e636f6d2f6c6f676f732f78696e6f2d6c6f676f2e706e67" alt="XinoSolutions Logo" width="120" />
  
  # @xinosolutions/react-datatable
  
  A modern React DataTable with search, pagination, row selection, mobile card layout, and theming.
  
  [![npm version](https://img.shields.io/npm/v/@xinosolutions/react-datatable.svg)](https://www.npmjs.com/package/@xinosolutions/react-datatable)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
</div>

---

## About XinoSolutions

**XinoSolutions** is a software development company dedicated to creating high-quality, developer-friendly solutions. We specialize in building modern React components and tools that help developers build better applications faster.

This package is part of our open-source initiative to contribute valuable tools to the React ecosystem.

---

## Features

- **Real-time Search** — Filter across columns with result count
- **Pagination** — Bottom bar by default; compact controls on mobile
- **Row Selection** — Multi-select (checkbox) or single-select (radio)
- **Customizable Columns** — Text, number, HTML, action menu, custom `render`
- **Mobile Layout** — Card/stack rows by default under 768px (`mobileLayout="table"` to keep the grid)
- **Sticky Header** — Enabled when `maxHeight` / `height` constrains the table body
- **Natural height** — Omit both height props for page-level vertical scroll (horizontal scroll only inside the table)
- **Sticky Columns** — Selection column stays visible while scrolling horizontally (or the first data column when selection is off)
- **Theme Customization** — Brand color via `--table-theme-color`
- **Empty & Loading States** — Clear empty and loading UI
- **TypeScript Types** — Bundled `index.d.ts`
- **Zero Runtime Dependencies** — Peer dependency on React only

---

## Project structure

```
react-datatable/
├── src/                 # Package source (edit here)
├── demo/                # Local Vite playground (not published)
├── scripts/             # deploy / link / unlink
├── package.json
├── vite.config.js       # Demo: aliases package → src for live reload
└── webpack.config.cjs   # Library build
```

---

## Local development

```bash
npm install
npm run dev
```

Open the Vite URL (usually `http://localhost:5173`). Changes under `src/` hot-reload in the demo via the package alias—no copy step.

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start local demo |
| `npm run build` | Build publishable package to `build/` |
| `npm run deploy` | Auth-style publish flow (build → version → publish) |
| `npm run link` | Build + register global `npm link` for consumer apps |
| `npm run unlink` | Remove global link |

```bash
npm run deploy
# or: ALLOW_DIRTY=1 npm run deploy
# or: node scripts/deploy.mjs patch|minor|major
```

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
| `rows` | `Array<Object>` | Yes | `[]` | Row data |
| `columns` | `Array<Column>` | Yes | `[]` | Column config |
| `pagination` | `Object` | No | See below | Pagination options |
| `checkboxSelection` | `Object` | No | — | Selection config (checkbox or radio) |
| `theme` | `Object` | No | — | Theme CSS variables |
| `handleMenu` | `(row) => MenuItem[]` | No | — | Menu items for `type: "action"` columns |
| `title` | `string \| null` | No | `"Search Table Data"` | Header title (`null` / `""` hides it) |
| `showSearch` | `boolean` | No | `true` | Show search input |
| `searchPlaceholder` | `string` | No | `"Search"` | Search placeholder |
| `showResultCount` | `boolean` | No | `true` | Show “n of m results” |
| `maxHeight` | `string \| number` | No | — | Max height of table body (enables sticky header + vertical scroll) |
| `height` | `string \| number` | No | — | Fixed height of table body (same sticky / vertical-scroll behavior) |
| `mobileLayout` | `"cards" \| "table"` | No | `"cards"` | Mobile (≤768px) layout mode |
| `sanitizeHtml` | `(html: string) => string` | No | — | Sanitizer for `type: "html"` cells |
| `loading` | `boolean` | No | `false` | Show loading state |

### Pagination Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showTopPagination` | `boolean` | `false` | Show pagination at the top |
| `showBottomPagination` | `boolean` | `true` | Show pagination at the bottom |
| `defaultPageSize` | `number` | `50` | Default page size |
| `pageSizeOptions` | `Array<number>` | `[10, 50, 100, 500]` | Page size options |

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
    icon: <EditIcon />, // any React node (SVG, emoji, icon component)
    onClick: () => edit(row),
  },
  {
    label: 'Delete',
    icon: <TrashIcon />,
    danger: true, // optional destructive styling
    onClick: () => remove(row),
  },
];

<DataTable rows={rows} columns={columns} handleMenu={handleMenu} />
```

Menu item shape: `{ label, icon?, danger?, onClick? }`.

### HTML Column (XSS warning)

`type: "html"` uses `dangerouslySetInnerHTML`. Only use with trusted content, or pass `sanitizeHtml`:

```jsx
<DataTable
  rows={rows}
  columns={[{ key: 'bio', label: 'Bio', type: 'html' }]}
  sanitizeHtml={(html) => yourSanitize(html)}
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

### Custom theme & chrome

```jsx
<DataTable
  title="Customers"
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

- **≤768px + `mobileLayout="cards"` (default):** each row becomes a labeled card; action menu and selection sit in the card header.
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
