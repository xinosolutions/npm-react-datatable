# @xinosolutions/react-datatable

A modern, feature-rich React DataTable component with search functionality, row selection (checkbox/radio), and customizable columns.

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

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `rows` | `Array<Object>` | Yes | Array of data objects to display in the table |
| `columns` | `Array<Object>` | Yes | Array of column configuration objects |
| `selected` | `Array<Object>` | Yes | Array of selected row objects |
| `setSelected` | `Function` | Yes | Function to update the selected rows |

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

## Features

- ✅ Search functionality across all columns
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
