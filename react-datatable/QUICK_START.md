# Quick Start Guide - React DataTable Deployment

## 🚀 Quick Deployment Steps

### Option 1: Automated Deployment (Recommended)

```bash
cd react-datatable
npm run deploy
```

Follow the interactive prompts to:
1. Copy files from application
2. Build the package
3. Bump version
4. Publish to npm

### Option 2: Manual Deployment

#### Step 1: Copy Files
```bash
cd react-datatable
npm run copy-files
```

#### Step 2: Build
```bash
npm run build
```

#### Step 3: Update Version
```bash
npm version patch   # or minor, or major
```

#### Step 4: Publish
```bash
npm login
npm publish --access public
```

## 📋 Pre-Deployment Checklist

- [ ] All changes tested in `application/` folder
- [ ] Files copied to `react-datatable/src/`
- [ ] Version updated in `package.json`
- [ ] Build successful (`npm run build`)
- [ ] Logged in to npm (`npm login`)
- [ ] Dry-run checked (`npm publish --dry-run`)

## 🔧 Common Commands

```bash
# Copy files from application
npm run copy-files

# Build package
npm run build

# Build for development
npm run build:dev

# Deploy (interactive)
npm run deploy

# Version bump
npm version patch   # 1.0.0 → 1.0.1
npm version minor    # 1.0.0 → 1.1.0
npm version major    # 1.0.0 → 2.0.0

# Publish
npm publish --access public

# Dry run (test without publishing)
npm publish --dry-run
```

## 🐛 Troubleshooting

### Build Fails
- Check webpack configuration
- Verify all dependencies installed: `npm install`
- Check for syntax errors in source files

### Publish Fails
- Ensure you're logged in: `npm whoami`
- Check package name matches your npm account
- Verify version number is unique
- Use `--access public` for scoped packages

### Files Not Copied
- Ensure `application/src/RactDataTable/` exists
- Check file permissions
- Run from `react-datatable` directory

## 📚 More Information

See [DEPLOYMENT_ROADMAP.md](./DEPLOYMENT_ROADMAP.md) for detailed documentation.
