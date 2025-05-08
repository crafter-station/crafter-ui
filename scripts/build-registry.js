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
  
  // Add content field to each file in the item
  if (item.files && item.files.length > 0) {
    item.files.forEach(file => {
      try {
        const filePath = path.join(process.cwd(), file.path);
        if (fs.existsSync(filePath)) {
          // Read the file content and add it to the file object
          file.content = fs.readFileSync(filePath, 'utf8');
        } else {
          console.warn(`Warning: File not found: ${filePath}`);
        }
      } catch (error) {
        console.error(`Error reading file ${file.path}:`, error);
      }
    });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(item, null, 2));
  console.log(`Generated: ${outputPath}`);
});

// Also copy the registry.json to public folder with content included
const publicRegistryJson = JSON.parse(JSON.stringify(registryJson));
publicRegistryJson.items.forEach(item => {
  if (item.files && item.files.length > 0) {
    item.files.forEach(file => {
      try {
        const filePath = path.join(process.cwd(), file.path);
        if (fs.existsSync(filePath)) {
          // Read the file content and add it to the file object
          file.content = fs.readFileSync(filePath, 'utf8');
        } else {
          console.warn(`Warning: File not found: ${filePath}`);
        }
      } catch (error) {
        console.error(`Error reading file ${file.path}:`, error);
      }
    });
  }
});

fs.writeFileSync(
  path.join(process.cwd(), 'public', 'registry.json'),
  JSON.stringify(publicRegistryJson, null, 2)
);
console.log('Generated: public/registry.json');

console.log('Registry build completed successfully!') 