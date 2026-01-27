# React DataTable - NPM Deployment Roadmap

## Overview
This document outlines the complete deployment process for `@xinosolutions/react-datatable` package to npm. The workflow follows a development → testing → deployment pattern.

## Project Structure

```
react-datatable/
├── application/              # Development & Testing Environment
│   └── src/
│       └── RactDataTable/   # Source files for development
│
└── react-datatable/         # NPM Package (Publishing Directory)
    ├── src/                 # Package source (copied from application)
    ├── build/               # Built package (generated)
    ├── package.json         # Package configuration
    └── webpack.config.js    # Build configuration
```

## Deployment Workflow

### Phase 1: Development & Testing
1. **Work in `application/` folder**
   - All development happens in `application/src/RactDataTable/`
   - Use `npm run dev` to start development server
   - Test thoroughly in the application environment

2. **Testing Checklist**
   - [ ] Component renders correctly
   - [ ] All props work as expected
   - [ ] CSS styles are applied correctly
   - [ ] No console errors or warnings
   - [ ] Responsive design works
   - [ ] All features tested (search, checkbox, radio, etc.)

### Phase 2: Copy Files to Package Directory
After testing is complete, copy files from `application/src/RactDataTable/` to `react-datatable/src/`

**Manual Copy Process:**
```bash
# Windows PowerShell
Copy-Item -Path "application\src\RactDataTable\*" -Destination "react-datatable\src\RactDataTable\" -Recurse -Force

# Or manually copy:
# application/src/RactDataTable/ → react-datatable/src/RactDataTable/
```

**Automated Script:**
Use the provided `copy-files.js` script:
```bash
npm run copy-files
```

### Phase 3: Build the Package
1. **Navigate to package directory**
   ```bash
   cd react-datatable
   ```

2. **Install dependencies** (if needed)
   ```bash
   npm install
   ```

3. **Build the package**
   ```bash
   npm run build
   ```
   This creates the `build/` directory with compiled code.

4. **Verify build output**
   - Check that `build/index.js` exists
   - Verify file size is reasonable
   - Test the built package locally if possible

### Phase 4: Version Management
1. **Update version in `package.json`**
   - Follow [Semantic Versioning](https://semver.org/):
     - **MAJOR** (x.0.0): Breaking changes
     - **MINOR** (0.x.0): New features (backward compatible)
     - **PATCH** (0.0.x): Bug fixes

2. **Update version manually or use npm version**
   ```bash
   npm version patch   # 1.0.0 → 1.0.1
   npm version minor   # 1.0.1 → 1.1.0
   npm version major   # 1.1.0 → 2.0.0
   ```

### Phase 5: Pre-Publish Checks
Before publishing, ensure:

- [ ] **package.json is correct**
  - [ ] Name: `@xinosolutions/react-datatable`
  - [ ] Version is updated
  - [ ] Description is filled
  - [ ] Author information is complete
  - [ ] License is specified
  - [ ] Keywords are relevant
  - [ ] Repository URL (if applicable)
  - [ ] Main entry point: `./build/index.js`
  - [ ] Files field includes only necessary files

- [ ] **Build is successful**
  - [ ] No build errors
  - [ ] Build output exists in `build/` directory

- [ ] **.npmignore is configured**
  - [ ] Source files excluded
  - [ ] Development files excluded
  - [ ] Only build output included

- [ ] **README.md exists** (recommended)
  - [ ] Installation instructions
  - [ ] Usage examples
  - [ ] API documentation
  - [ ] Props description

### Phase 6: NPM Authentication
1. **Login to npm**
   ```bash
   npm login
   ```
   - Enter your npm username
   - Enter your password
   - Enter your email
   - Enter OTP if 2FA is enabled

2. **Verify authentication**
   ```bash
   npm whoami
   ```

3. **Check if you have access to the scoped package**
   - Ensure you're part of the `@xinosolutions` organization
   - Or use a personal scope if publishing individually

### Phase 7: Publishing to NPM

#### Option A: Dry Run (Recommended First)
Test the publish process without actually publishing:
```bash
npm publish --dry-run
```
This shows what files would be published.

#### Option B: Publish Public Package
```bash
npm publish --access public
```
The `--access public` flag is required for scoped packages (`@xinosolutions/...`).

#### Option C: Publish Private Package (if using npm private packages)
```bash
npm publish
```

### Phase 8: Post-Publish Verification
1. **Verify on npm website**
   - Visit: `https://www.npmjs.com/package/@xinosolutions/react-datatable`
   - Check version number
   - Verify package size
   - Check files included

2. **Test installation**
   ```bash
   npm install @xinosolutions/react-datatable
   ```

3. **Test in a new project**
   ```bash
   # Create test project
   npx create-react-app test-datatable
   cd test-datatable
   npm install @xinosolutions/react-datatable
   # Import and test the component
   ```

## Quick Deployment Checklist

Use this checklist for each deployment:

```
[ ] Development completed in application/
[ ] All tests passed
[ ] Files copied to react-datatable/src/
[ ] Version updated in package.json
[ ] npm run build executed successfully
[ ] Build output verified
[ ] npm login completed
[ ] npm publish --dry-run checked
[ ] npm publish --access public executed
[ ] Package verified on npm website
[ ] Installation tested in new project
```

## Common Commands Reference

```bash
# Development (in application/)
npm run dev              # Start dev server
npm run build            # Build application

# Package Management (in react-datatable/)
npm run copy-files       # Copy files from application (if script exists)
npm run build            # Build the package
npm run prepublishOnly   # Auto-run before publish
npm version patch        # Bump patch version
npm version minor        # Bump minor version
npm version major        # Bump major version

# Publishing
npm login                # Login to npm
npm whoami               # Check current user
npm publish --dry-run    # Test publish
npm publish --access public  # Publish public scoped package
npm unpublish <package>@<version>  # Unpublish (within 72 hours)
```

## Troubleshooting

### Issue: "You do not have permission to publish"
**Solution:** 
- Ensure you're logged in: `npm login`
- Check organization access for `@xinosolutions`
- Verify package name matches your npm account/organization

### Issue: "Package name already exists"
**Solution:**
- Check if package exists: `npm view @xinosolutions/react-datatable`
- Use a different name or version
- If it's your package, update version number

### Issue: "Build fails"
**Solution:**
- Check webpack configuration
- Verify all dependencies are installed
- Check for syntax errors in source files
- Review build output for specific errors

### Issue: "Module not found after installation"
**Solution:**
- Verify `main` field in package.json points to correct file
- Check that build output exists
- Ensure file paths in exports are correct

## Best Practices

1. **Always test before publishing**
   - Test in development environment
   - Test the built package locally if possible

2. **Use semantic versioning**
   - Follow MAJOR.MINOR.PATCH format
   - Document breaking changes

3. **Write clear commit messages**
   - Use conventional commits format
   - Document changes in CHANGELOG.md

4. **Keep package size small**
   - Only include necessary files
   - Use .npmignore effectively
   - Minimize dependencies

5. **Document your package**
   - Write comprehensive README.md
   - Include usage examples
   - Document all props and options

6. **Maintain changelog**
   - Track all version changes
   - Document new features and fixes

## Modern NPM Publishing Features

### Package Exports (Modern Approach)
Use `exports` field in package.json for better module resolution:
```json
{
  "exports": {
    ".": {
      "import": "./build/index.esm.js",
      "require": "./build/index.js",
      "types": "./build/index.d.ts"
    },
    "./styles": "./build/styles.css"
  }
}
```

### TypeScript Support (Future Enhancement)
Consider adding TypeScript definitions for better developer experience:
- Add `types` field in package.json
- Generate `.d.ts` files during build
- Include types in published package

### ESM and CJS Support (Future Enhancement)
Support both ES modules and CommonJS:
- Build both formats
- Use `exports` field for dual package support

## Next Steps

1. ✅ Set up modern build configuration
2. ✅ Create deployment scripts
3. ⏭️ Add automated testing
4. ⏭️ Set up CI/CD pipeline
5. ⏭️ Add TypeScript support
6. ⏭️ Create comprehensive documentation

---

**Last Updated:** 2024
**Maintained by:** Xino Solutions Team
