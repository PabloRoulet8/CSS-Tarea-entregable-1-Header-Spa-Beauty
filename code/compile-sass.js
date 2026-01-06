const sass = require('sass');
const fs = require('fs');
const path = require('path');

const sassDir = path.resolve(__dirname, 'sass');
const sourceFile = path.resolve(sassDir, 'app.scss');
const outputFile = path.resolve(__dirname, 'css', 'style.css');

const compileSass = async () => {
  try {
    const result = await sass.compileAsync(sourceFile, { style: "expanded" });
    fs.writeFileSync(outputFile, result.css);
    console.log(`Sass compiled successfully at: ${new Date().toLocaleTimeString()}`);
  } catch (error) {
    console.error('Sass compilation error:', error);
  }
};

console.log('Starting Sass watcher on ./sass directory...');

fs.watch(sassDir, { recursive: true }, (eventType, filename) => {
  if (filename && path.extname(filename) === '.scss') {
    console.log(`\nChange detected in ${filename}. Recompiling...`);
    compileSass();
  }
});

// Initial compilation
console.log("Performing initial compilation...");
compileSass();
