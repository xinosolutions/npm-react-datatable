# React DataTable - Development & NPM Package

A monorepo containing both the development environment and the npm package for `@xinosolutions/react-datatable` - a modern, feature-rich React DataTable component.

## 📁 Project Structure

```
react-datatable/
├── application/              # Development & Testing Environment
│   ├── src/
│   │   └── RactDataTable/   # Source files - Develop here!
│   └── package.json         # Vite-based dev environment
│
└── react-datatable/         # NPM Package (Publishing Directory)
    ├── src/                 # Package source (copied from application)
    ├── build/               # Built package (generated)
    ├── scripts/             # Deployment scripts
    └── package.json         # NPM package configuration
```

## 🎯 Purpose

This repository serves two main purposes:

1. **Development Environment** (`application/`) - Where you develop and test the DataTable component
2. **NPM Package** (`react-datatable/`) - The package that gets published to npm

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

See [react-datatable/README.md](./react-datatable/README.md) for usage documentation.

## 🔄 Development Workflow

### 1. Development Phase
- Work in `application/src/RactDataTable/`
- Use `npm run dev` to start the development server
- Test all features thoroughly

### 2. Testing Phase
- Verify component works correctly
- Test all props and features
- Check responsive design
- Ensure no console errors

### 3. Deployment Phase
- Copy files from `application/src/RactDataTable/` to `react-datatable/src/`
- Build the package: `cd react-datatable && npm run build`
- Update version: `npm version patch|minor|major`
- Publish: `npm publish --access public`

## 📚 Documentation

- **[application/README.md](./application/README.md)** - Development environment guide
- **[react-datatable/README.md](./react-datatable/README.md)** - Package documentation and usage
- **[react-datatable/DEPLOYMENT_ROADMAP.md](./react-datatable/DEPLOYMENT_ROADMAP.md)** - Complete deployment guide
- **[react-datatable/QUICK_START.md](./react-datatable/QUICK_START.md)** - Quick deployment reference

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

## 📦 Package Information

- **Package Name:** `@xinosolutions/react-datatable`
- **NPM Registry:** [npmjs.com](https://www.npmjs.com/package/@xinosolutions/react-datatable)
- **License:** MIT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes in `application/src/RactDataTable/`
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@xinosolutions/react-datatable)
- [GitHub Repository](https://github.com/xinosolutions/npm-react-datatable)
- [Issue Tracker](https://github.com/xinosolutions/npm-react-datatable/issues)

## 📞 Support

For questions, issues, or feature requests, please open an issue on GitHub.

---

**Maintained by:** Xino Solutions
