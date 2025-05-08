const fs = require('fs');
const path = require('path');

// Load the registry.json file
const registryJson = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'registry.json'), 'utf8')
);

// Create output directory if it doesn't exist
const outputDir = path.join(process.cwd(), 'public', 'r');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Process each item in the registry
registryJson.items.forEach(item => {
  // Create individual registry item file
  const outputPath = path.join(outputDir, `${item.name}.json`);
  
  // Add $schema field if not already present
  if (!item.$schema) {
    item.$schema = "https://ui.shadcn.com/schema/registry-item.json";
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(item, null, 2));
  console.log(`Generated: ${outputPath}`);
});

// Also copy the registry.json to public folder
fs.copyFileSync(
  path.join(process.cwd(), 'registry.json'),
  path.join(process.cwd(), 'public', 'registry.json')
);
console.log('Generated: public/registry.json');

console.log('Registry build completed successfully!') 