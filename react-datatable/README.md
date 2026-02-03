# @xinosolutions/react-datatable

A modern, feature-rich React DataTable component with search functionality, pagination, row selection (checkbox/radio), and customizable columns.

> **Note:** This is the npm package directory. For development, see the `application/` folder in the root of this repository.

## Installation

```bash
npm install @xinosolutions/react-datatable
```

or

```bash
yarn add @xinosolutions/react-datatable
```

## Usage

```jsx
import React, { useState } from 'react';
import DataTable from '@xinosolutions/react-datatable';

function App() {
  const [selected, setSelected] = useState([]);

  const rows = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '098-765-4321',
    },
  ];

  const columns = [
    { key: 'id', label: 'ID', type: 'checkbox' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
  ];

  return (
    <DataTable
      rows={rows}
      columns={columns}
      selected={selected}
      setSelected={setSelected}
    />
  );
}

export default App;
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `rows` | `Array<Object>` | Yes | - | Array of data objects to display in the table |
| `columns` | `Array<Object>` | Yes | - | Array of column configuration objects |
| `selected` | `Array<Object>` | Yes | - | Array of selected row objects |
| `setSelected` | `Function` | Yes | - | Function to update the selected rows |
| `showTopPagination` | `Boolean` | No | `true` | Show pagination controls at the top of the table |
| `showBottomPagination` | `Boolean` | No | `true` | Show pagination controls at the bottom of the table |
| `defaultPageSize` | `Number` | No | `10` | Default number of items per page |
| `pageSizeOptions` | `Array<Number>` | No | `[10, 25, 50, 100]` | Available page size options for the dropdown |

## Column Types

### Standard Column
```jsx
{ key: 'name', label: 'Name' }
```

### Checkbox Column
```jsx
{ key: 'id', type: 'checkbox' }
```

### Radio Column
```jsx
{ key: 'id', type: 'radio' }
```

### Number Column (Row Number)
```jsx
{ label: '#', type: 'number' }
```

### HTML Column
```jsx
{ key: 'description', label: 'Description', type: 'html' }
```

## Pagination

The DataTable component includes comprehensive pagination functionality:

### Basic Usage
Pagination is enabled by default with 10 items per page. You can customize it:

```jsx
<DataTable
  rows={rows}
  columns={columns}
  selected={selected}
  setSelected={setSelected}
  defaultPageSize={25}
  pageSizeOptions={[10, 25, 50, 100, 200]}
/>
```

### Pagination Controls
- **First/Previous/Next/Last buttons**: Navigate between pages
- **Page numbers**: Click to jump to a specific page
- **Page size selector**: Change the number of items per page (10, 25, 50, 100)
- **Record information**: Shows "Showing X to Y of Z records"
- **Page information**: Displays current page and total pages

### Show/Hide Pagination
You can control pagination visibility:

```jsx
<DataTable
  rows={rows}
  columns={columns}
  selected={selected}
  setSelected={setSelected}
  showTopPagination={true}    // Show pagination at top
  showBottomPagination={false} // Hide pagination at bottom
/>
```

### Pagination Features
- Automatically resets to page 1 when search query changes
- Works seamlessly with search functionality (paginates filtered results)
- Handles edge cases (empty data, single page, large datasets)
- Responsive design for mobile devices
- Accessible keyboard navigation

## Features

- ✅ Search functionality across all columns
- ✅ **Pagination with customizable page sizes**
- ✅ **Top and bottom pagination controls**
- ✅ Row selection with checkboxes
- ✅ Radio button selection
- ✅ Customizable columns
- ✅ HTML content support
- ✅ Responsive design
- ✅ Sticky header
- ✅ Modern UI/UX

## Requirements

- React 16.8+ or React 17+ or React 18+ or React 19+
- React DOM 16.8+ or React DOM 17+ or React DOM 18+ or React DOM 19+

## License

MIT

## Support

For issues and feature requests, please visit: [GitHub Issues](https://github.com/xinosolutions/npm-react-datatable/issues)
