// Simple test to verify the package exports work correctly
const pkg = require('./build/index.js');

console.log('Package exports:', Object.keys(pkg));
console.log('Has default:', !!pkg.default);
console.log('Has DataTable:', !!pkg.DataTable);
console.log('Type of default:', typeof pkg.default);
console.log('Type of DataTable:', typeof pkg.DataTable);
