# React DataTable - Development Environment

<div align="center">
  
  <img src="https://camo.githubusercontent.com/cfe32456bb3319eb01699f6e37171b62fdef7878a4370eaa899f7ba17457fa0f/68747470733a2f2f78696e6f736f6c7574696f6e732e636f6d2f6c6f676f732f78696e6f2d6c6f676f2e706e67" alt="XinoSolutions Logo" width="100" />
  
  This is the **development and testing environment** for the `@xinosolutions/react-datatable` package.
  
</div>

---

## 🎯 Purpose

This folder contains a Vite-based React application used for:

- **Developing** the DataTable component
- **Testing** new features and changes
- **Previewing** the component before publishing
- **Debugging** and iterating on the component
- **Prototyping** new features and UI improvements

---

## 🚀 Getting Started

### Prerequisites

- Node.js 14+ and npm 6+ (or yarn/pnpm)
- Basic knowledge of React

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

The dev server includes:
- Hot Module Replacement (HMR)
- Fast refresh
- Automatic browser reload on file changes

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

---

## 📁 Project Structure

```
application/
├── src/
│   ├── RactDataTable/          # ⭐ Main component source - Edit here!
│   │   ├── Components/         # Sub-components
│   │   │   ├── Header.jsx      # Table header component
│   │   │   ├── Pagination.jsx  # Pagination controls
│   │   │   ├── HTML/          # HTML form elements
│   │   │   │   ├── Checkbox.jsx
│   │   │   │   └── Radio.jsx
│   │   │   └── Icons/         # SVG icon components
│   │   │       ├── SearchIcon.jsx
│   │   │       ├── ClearIcon.jsx
│   │   │       ├── NoDataIcon.jsx
│   │   │       ├── ChevronLeftIcon.jsx
│   │   │       └── ChevronRightIcon.jsx
│   │   ├── CSS/               # Stylesheets
│   │   │   └── DataTable.module.css  # Main styles (CSS Modules)
│   │   └── Pages/              # Main component
│   │       └── DataTable.jsx  # Main DataTable component
│   ├── App.jsx                # Example usage and testing
│   ├── RactDataTable.js        # Export file
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── public/                     # Static assets
│   └── logo.png               # Logo file
├── package.json                # Dependencies and scripts
├── vite.config.js             # Vite configuration
└── eslint.config.js           # ESLint configuration
```

---

## 💻 Development Workflow

### 1. Make Changes

Edit files in `src/RactDataTable/`:

- **`Pages/DataTable.jsx`** - Main component logic
- **`Components/Header.jsx`** - Table header with select all functionality
- **`Components/Pagination.jsx`** - Pagination controls
- **`Components/HTML/Checkbox.jsx`** - Checkbox component
- **`Components/HTML/Radio.jsx`** - Radio button component
- **`CSS/DataTable.module.css`** - All styles (CSS Modules)

### 2. Test Locally

- The dev server automatically reloads on changes
- Test all features:
  - ✅ Search functionality
  - ✅ Row selection (checkbox/radio)
  - ✅ Different column types (text, number, HTML, custom render)
  - ✅ Pagination (top and bottom)
  - ✅ Theme customization
  - ✅ Responsive design
  - ✅ Empty states

### 3. Verify

- Check browser console for errors
- Test with different data sets (small, medium, large)
- Verify styling and layout
- Test on different screen sizes (mobile, tablet, desktop)
- Test edge cases (empty data, single row, etc.)
- Verify accessibility (keyboard navigation, ARIA labels)

### 4. Ready to Deploy?

Once testing is complete, copy files to `react-datatable/` folder:

```bash
cd ../react-datatable
npm run copy-files
npm run build
```

---

## 🧪 Testing Checklist

Before copying files to the package directory, ensure:

- [ ] Component renders without errors
- [ ] All props work correctly
- [ ] Search functionality works across all columns
- [ ] Checkbox selection works (single and select all)
- [ ] Radio selection works
- [ ] All column types display correctly (text, number, HTML, custom render)
- [ ] Pagination works (top and bottom)
- [ ] Page size selector works
- [ ] Theme customization works
- [ ] CSS styles are applied properly
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile
- [ ] Empty states display correctly
- [ ] Performance is acceptable with large datasets
- [ ] Accessibility features work (keyboard navigation, ARIA labels)

---

## 📝 Example Usage

See `src/App.jsx` for a complete example. Here's a basic setup:

```jsx
import { useState } from "react";
import { DataTable } from "./RactDataTable";

function App() {
  const [selected, setSelected] = useState([]);

  const rows = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  const columns = [
    { label: "#", type: "number" },
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];

  return (
    <DataTable
      rows={rows}
      columns={columns}
      checkboxSelection={{
        selected,
        setSelected,
        selectBy: "id"
      }}
      theme={{
        '--table-theme-color': '#3b82f6'
      }}
    />
  );
}
```

---

## 🛠️ Technologies Used

- **React** - UI library (18+ / 19+)
- **Vite** - Build tool and dev server (rolldown-vite)
- **ESLint** - Code linting
- **CSS Modules** - Scoped styling

---

## 📦 Dependencies

### Peer Dependencies
- React 18+ / React 19+
- React DOM 18+ / React DOM 19+

### Dev Dependencies
- Vite (rolldown-vite)
- ESLint
- TypeScript types for React

---

## 🎨 Styling

The component uses **CSS Modules** for scoped styling. All styles are in `CSS/DataTable.module.css`.

### Theme Customization

The component supports theme customization via CSS variables:

- `--table-theme-color` - Main theme color (default: `#4FAFA0`)

You can customize the theme by passing a `theme` prop:

```jsx
<DataTable
  rows={rows}
  columns={columns}
  theme={{
    '--table-theme-color': '#3b82f6'
  }}
/>
```

---

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

3. **Test the built package**:
   ```bash
   node test-import.js
   ```

4. **Deploy to npm**:
   ```bash
   npm version patch|minor|major
   npm publish --access public
   ```

See [../react-datatable/DEPLOYMENT_ROADMAP.md](../react-datatable/DEPLOYMENT_ROADMAP.md) for detailed deployment instructions.

---

## 💡 Development Tips

- **Use React DevTools** for debugging component state
- **Check the browser console** regularly for warnings
- **Test with various data sizes** - small (10 rows), medium (100 rows), large (1000+ rows)
- **Test edge cases** - empty data, single row, very long text, special characters
- **Keep the component API consistent** - don't break existing props
- **Document new features** - update README files when adding features
- **Follow React best practices** - use hooks properly, avoid unnecessary re-renders
- **Test accessibility** - keyboard navigation, screen readers
- **Check performance** - use React DevTools Profiler for performance issues

---

## 🐛 Troubleshooting

### Dev server won't start
- Check if port 5173 is already in use
- Try deleting `node_modules` and reinstalling: `rm -rf node_modules && npm install`

### Styles not applying
- Ensure CSS Modules are imported correctly
- Check browser DevTools for CSS conflicts

### Component not updating
- Check if HMR is working (should see update in browser console)
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [Package README](../react-datatable/README.md) - Complete package documentation

---

**Note:** This is a development environment. The actual npm package is in the `react-datatable/` folder. Always test thoroughly before copying files to the package directory.

---

<div align="center">
  <p><strong>Made with ❤️ by <a href="https://github.com/xinosolutions">XinoSolutions</a></strong></p>
</div>
