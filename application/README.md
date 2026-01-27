# React DataTable - Development Environment

This is the **development and testing environment** for the `@xinosolutions/react-datatable` package.

## 🎯 Purpose

This folder contains a Vite-based React application used for:
- **Developing** the DataTable component
- **Testing** new features and changes
- **Previewing** the component before publishing
- **Debugging** and iterating on the component

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Building

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
application/
├── src/
│   ├── RactDataTable/          # ⭐ Main component source - Edit here!
│   │   ├── Components/         # Component sub-components
│   │   ├── CSS/                # Stylesheets
│   │   └── Pages/              # Main DataTable component
│   ├── App.jsx                 # Example usage
│   └── main.jsx                # Entry point
├── public/                     # Static assets
└── package.json                # Dependencies and scripts
```

## 💻 Development Workflow

### 1. Make Changes
Edit files in `src/RactDataTable/`:
- `Pages/DataTable.jsx` - Main component
- `Components/` - Sub-components (Header, Checkbox, Radio)
- `CSS/DataTable.module.css` - Styles

### 2. Test Locally
- The dev server automatically reloads on changes
- Test all features:
  - Search functionality
  - Row selection (checkbox/radio)
  - Different column types
  - Responsive design

### 3. Verify
- Check browser console for errors
- Test with different data sets
- Verify styling and layout
- Test on different screen sizes

### 4. Ready to Deploy?
Once testing is complete, copy files to `react-datatable/` folder:
```bash
cd ../react-datatable
npm run copy-files
```

## 🧪 Testing Checklist

Before copying files to the package directory, ensure:

- [ ] Component renders without errors
- [ ] All props work correctly
- [ ] Search functionality works
- [ ] Checkbox selection works
- [ ] Radio selection works
- [ ] All column types display correctly
- [ ] CSS styles are applied properly
- [ ] No console errors or warnings
- [ ] Responsive design works
- [ ] Performance is acceptable

## 📝 Example Usage

See `src/App.jsx` for a complete example:

```jsx
import { useState } from "react";
import DataTable from "./RactDataTable/Pages/DataTable";

function App() {
  const [selected, setSelected] = useState([]);

  const rows = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  const columns = [
    { key: "id", type: "checkbox" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
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
```

## 🛠️ Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **CSS Modules** - Scoped styling

## 📦 Dependencies

- React 18+ / React 19+
- React DOM 18+ / React DOM 19+

## 🔄 Next Steps

After development and testing:

1. **Copy files** to package directory:
   ```bash
   cd ../react-datatable
   npm run copy-files
   ```

2. **Build the package**:
   ```bash
   npm run build
   ```

3. **Deploy to npm**:
   ```bash
   npm run deploy
   ```

See [../react-datatable/DEPLOYMENT_ROADMAP.md](../react-datatable/DEPLOYMENT_ROADMAP.md) for detailed deployment instructions.

## 💡 Tips

- Use React DevTools for debugging
- Check the browser console regularly
- Test with various data sizes (small, medium, large datasets)
- Test edge cases (empty data, single row, etc.)
- Keep the component API consistent

---

**Note:** This is a development environment. The actual npm package is in the `react-datatable/` folder.
