<div align="center">
  
  <img src="https://xinosolutions.com/logos/xino-logo.png" alt="XinoSolutions Logo" width="120" />
  
  # @xinosolutions/react-datatable
  
  A modern, feature-rich React DataTable component with search functionality, pagination, row selection, and customizable theming.
  
  [![npm version](https://img.shields.io/npm/v/@xinosolutions/react-datatable.svg)](https://www.npmjs.com/package/@xinosolutions/react-datatable)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
</div>

---

## About XinoSolutions

**XinoSolutions** is a software development company dedicated to creating high-quality, developer-friendly solutions. We specialize in building modern React components and tools that help developers build better applications faster. Our commitment to excellence, clean code, and user experience drives everything we create.

This package is part of our open-source initiative to contribute valuable tools to the React ecosystem.

---

## Features

- ✅ **Real-time Search** - Search across all columns with instant filtering
- ✅ **Pagination** - Full-featured pagination with customizable page sizes
- ✅ **Row Selection** - Checkbox and radio button selection support
- ✅ **Customizable Columns** - Multiple column types (text, number, HTML, custom render)
- ✅ **Theme Customization** - Customizable theme colors via CSS variables
- ✅ **Responsive Design** - Mobile-friendly and responsive layout
- ✅ **Sticky Header** - Header stays visible while scrolling
- ✅ **Empty States** - Beautiful empty state messages
- ✅ **Accessibility** - ARIA labels and keyboard navigation support
- ✅ **TypeScript Ready** - Works seamlessly with TypeScript projects
- ✅ **Zero Dependencies** - No external dependencies (except React)

---

## Installation

```bash
npm install @xinosolutions/react-datatable
```

or

```bash
yarn add @xinosolutions/react-datatable
```

or

```bash
pnpm add @xinosolutions/react-datatable
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
      checkboxSelection={{
        selected,
        setSelected,
        selectBy: 'id'
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
| `rows` | `Array<Object>` | Yes | - | Array of data objects to display in the table |
| `columns` | `Array<Column>` | Yes | - | Array of column configuration objects |
| `pagination` | `Object` | No | See below | Pagination configuration object |
| `checkboxSelection` | `Object` | No | - | Checkbox selection configuration |
| `theme` | `Object` | No | - | Theme customization object |

### Pagination Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showTopPagination` | `boolean` | `true` | Show pagination controls at the top |
| `showBottomPagination` | `boolean` | `true` | Show pagination controls at the bottom |
| `defaultPageSize` | `number` | `50` | Default number of items per page |
| `pageSizeOptions` | `Array<number>` | `[10, 50, 100, 500]` | Available page size options |

### CheckboxSelection Object

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `selected` | `Array<Object>` | Yes | Array of selected row objects |
| `setSelected` | `Function` | Yes | Function to update selected rows |
| `selectBy` | `string` | No | Key to use for row identification (default: `"_id"`) |

### Theme Object

| Property | Type | Description |
|----------|------|-------------|
| `--table-theme-color` | `string` | CSS variable for theme color (default: `#4FAFA0`) |

---

## Column Types

### Standard Column

Displays the value from the row object using the specified key.

```jsx
{ key: 'name', label: 'Name' }
```

### Number Column (Row Number)

Displays the row number automatically.

```jsx
{ label: '#', type: 'number' }
```

### HTML Column

Renders HTML content from the row data.

```jsx
{ 
  key: 'description', 
  label: 'Description', 
  type: 'html' 
}
```

### Custom Render Column

Use a custom render function for complete control over cell content.

```jsx
{ 
  label: 'Actions', 
  render: (row, index) => (
    <button onClick={() => handleEdit(row)}>Edit</button>
  )
}
```

---

## Examples

### Basic Usage

```jsx
import { DataTable } from '@xinosolutions/react-datatable';

const rows = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
];

<DataTable rows={rows} columns={columns} />
```

### With Checkbox Selection

```jsx
import { useState } from 'react';
import { DataTable } from '@xinosolutions/react-datatable';

function App() {
  const [selected, setSelected] = useState([]);

  return (
    <DataTable
      rows={rows}
      columns={columns}
      checkboxSelection={{
        selected,
        setSelected,
        selectBy: 'id'
      }}
    />
  );
}
```

### Custom Pagination

```jsx
<DataTable
  rows={rows}
  columns={columns}
  pagination={{
    showTopPagination: true,
    showBottomPagination: false,
    defaultPageSize: 25,
    pageSizeOptions: [10, 25, 50, 100, 200]
  }}
/>
```

### Custom Theme

```jsx
<DataTable
  rows={rows}
  columns={columns}
  theme={{
    '--table-theme-color': '#3b82f6' // Custom blue theme
  }}
/>
```

### Mixed Column Types

```jsx
const columns = [
  { label: '#', type: 'number' },
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { 
    key: 'description', 
    label: 'Description', 
    type: 'html' 
  },
  { 
    label: 'Actions', 
    render: (row) => (
      <div>
        <button onClick={() => edit(row)}>Edit</button>
        <button onClick={() => delete(row)}>Delete</button>
      </div>
    )
  },
];
```

---

## Search Functionality

The DataTable includes built-in search functionality that:

- Searches across all columns automatically
- Filters results in real-time as you type
- Shows result count (e.g., "5 of 12 results")
- Displays "No Data Found" when search returns no results
- Resets pagination to page 1 when search query changes

The search is case-insensitive and searches all column values that have a `key` property.

---

## Pagination Features

- **First/Previous/Next/Last buttons** - Navigate between pages
- **Page numbers** - Click to jump to a specific page
- **Page size selector** - Change items per page
- **Record information** - Shows "Showing X to Y of Z records"
- **Page information** - Displays "Page X of Y"
- **Smart page number display** - Shows ellipsis for large page counts
- **Responsive design** - Adapts to mobile screens

---

## Theme Customization

Customize the table theme by passing a `theme` object with CSS variables:

```jsx
<DataTable
  rows={rows}
  columns={columns}
  theme={{
    '--table-theme-color': '#3b82f6' // Your brand color
  }}
/>
```

The theme color is used for:
- Checkbox checked states
- Radio button selected states
- Pagination active page button
- Focus states on interactive elements

**Default theme color:** `#4FAFA0` (teal)

---

## Requirements

- **React:** 16.8+ / 17+ / 18+ / 19+
- **React DOM:** 16.8+ / 17+ / 18+ / 19+

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## License

MIT License - see [LICENSE](../License) file for details.

---

## Support

For issues, feature requests, or questions:

- 📧 Open an issue on [GitHub](https://github.com/xinosolutions/npm-react-datatable/issues)
- 📦 [NPM Package](https://www.npmjs.com/package/@xinosolutions/react-datatable)
- 🐙 [GitHub Repository](https://github.com/xinosolutions/npm-react-datatable)

---

<div align="center">
  <p><strong>Made with ❤️ by <a href="https://github.com/xinosolutions">XinoSolutions</a></strong></p>
  <p>© 2026 XinoSolutions. All rights reserved.</p>
</div>
