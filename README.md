<div align="center">
  
  <img src="https://xinosolutions.com/logos/xino-logo.png" alt="XinoSolutions Logo" width="120" />
  
  # React DataTable - Development & NPM Package
  
  A monorepo containing both the development environment and the npm package for `@xinosolutions/react-datatable` - a modern, feature-rich React DataTable component.
  
  [![npm version](https://img.shields.io/npm/v/@xinosolutions/react-datatable.svg)](https://www.npmjs.com/package/@xinosolutions/react-datatable)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
</div>

---

## About XinoSolutions

**XinoSolutions** is a software development company dedicated to creating high-quality, developer-friendly solutions. We specialize in building modern React components and tools that help developers build better applications faster. Our commitment to excellence, clean code, and user experience drives everything we create.

This repository is part of our open-source initiative to contribute valuable tools to the React ecosystem.

---

## 📁 Project Structure

```
react-datatable/
├── application/              # Development & Testing Environment
│   ├── src/
│   │   └── RactDataTable/   # Source files - Develop here!
│   │       ├── Components/  # Sub-components (Header, Pagination, etc.)
│   │       ├── CSS/         # Stylesheets (CSS Modules)
│   │       └── Pages/       # Main DataTable component
│   ├── public/              # Static assets
│   └── package.json         # Vite-based dev environment
│
└── react-datatable/         # NPM Package (Publishing Directory)
    ├── src/                 # Package source (copied from application)
    ├── build/               # Built package (generated)
    ├── scripts/             # Deployment scripts
    │   ├── copy-files.js   # Copy files from application
    │   ├── deploy.js       # Automated deployment
    │   └── post-build.js   # Post-build processing
    └── package.json         # NPM package configuration
```

---

## 🎯 Purpose

This repository serves two main purposes:

1. **Development Environment** (`application/`) - Where you develop and test the DataTable component
2. **NPM Package** (`react-datatable/`) - The package that gets published to npm

---

## 🚀 Getting Started

### For Developers

1. **Clone the repository**
   ```bash
   git clone https://github.com/xinosolutions/npm-react-datatable.git
   cd npm-react-datatable
   ```

2. **Set up development environment**
   ```bash
   cd application
   npm install
   npm run dev
   ```

3. **Start developing**
   - Edit files in `application/src/RactDataTable/`
   - Test your changes in the browser
   - The dev server runs on `http://localhost:5173` (or similar)

### For Package Users

Install the package:
```bash
npm install @xinosolutions/react-datatable
```

See [react-datatable/README.md](./react-datatable/README.md) for complete usage documentation.

---

## 🔄 Development Workflow

### 1. Development Phase
- Work in `application/src/RactDataTable/`
- Use `npm run dev` to start the development server
- Test all features thoroughly
- Check responsive design on different screen sizes

### 2. Testing Phase
- Verify component works correctly
- Test all props and features
- Check responsive design
- Ensure no console errors
- Test with various data sizes
- Verify theme customization

### 3. Deployment Phase
- Copy files from `application/src/RactDataTable/` to `react-datatable/src/`
- Build the package: `cd react-datatable && npm run build`
- Update version: `npm version patch|minor|major`
- Publish: `npm publish --access public`

---

## 📚 Documentation

- **[application/README.md](./application/README.md)** - Development environment guide
- **[react-datatable/README.md](./react-datatable/README.md)** - Package documentation and usage
- **[react-datatable/DEPLOYMENT_ROADMAP.md](./react-datatable/DEPLOYMENT_ROADMAP.md)** - Complete deployment guide
- **[react-datatable/QUICK_START.md](./react-datatable/QUICK_START.md)** - Quick deployment reference

---

## 🛠️ Quick Commands

### Development (in `application/`)
```bash
npm run dev      # Start development server
npm run build    # Build application
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Package Management (in `react-datatable/`)
```bash
npm run copy-files    # Copy files from application
npm run build         # Build the package
npm run deploy        # Automated deployment
npm publish --access public  # Publish to npm
```

---

## ✨ Features

- ✅ Real-time search across all columns
- ✅ Full-featured pagination with customizable page sizes
- ✅ Checkbox and radio button row selection
- ✅ Multiple column types (text, number, HTML, custom render)
- ✅ Customizable theme colors
- ✅ Responsive design
- ✅ Sticky header
- ✅ Beautiful empty states
- ✅ Accessibility support
- ✅ Zero external dependencies (except React)

---

## 📦 Package Information

- **Package Name:** `@xinosolutions/react-datatable`
- **NPM Registry:** [npmjs.com](https://www.npmjs.com/package/@xinosolutions/react-datatable)
- **License:** MIT
- **Repository:** [GitHub](https://github.com/xinosolutions/npm-react-datatable)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes in `application/src/RactDataTable/`
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📝 License

MIT License - see [License](./application/License) file for details.

---

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@xinosolutions/react-datatable)
- [GitHub Repository](https://github.com/xinosolutions/npm-react-datatable)
- [Issue Tracker](https://github.com/xinosolutions/npm-react-datatable/issues)

---

## 📞 Support

For questions, issues, or feature requests, please open an issue on [GitHub](https://github.com/xinosolutions/npm-react-datatable/issues).

---

<div align="center">
  <p><strong>Made with ❤️ by <a href="https://github.com/xinosolutions">XinoSolutions</a></strong></p>
  <p>© 2026 XinoSolutions. All rights reserved.</p>
</div>
