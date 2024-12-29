import fs from 'fs';
import path from 'path';

export default async function updateCdn() {

// Define paths for files to update
const files = [
  '../apariumUikit/dist/js/index.js',
  '../apariumUikit/dist/js/preview.js',
  '../apariumUikit/dist/js/preview.min.js',
];

// Replacement patterns
const replacements = [
  {
    target: '../dist/js/uikit-icons.js',
    replacement: './js/uikit-icons.js',
  },
  {
    target: '../dist/js/uikit.js',
    replacement: './js/uikit.js',
  },
  {
    target: '../dist/css/uikit-core.css',
    replacement: './css/uikit-core.css',
  },
  {
    target: '../dist/css/uikit.css',
    replacement: './css/uikit.css',
  },
  {
    target: '../themes.json',
    replacement: './themes.json',
  },
];

// Function to process file updates
const updateFiles = async () => {
  for (const filePath of files) {
    const absolutePath = path.resolve(filePath);

    try {
      // Read the file content
      const content = await fs.promises.readFile(absolutePath, 'utf8');

      // Apply replacements
      let updatedContent = content;
      replacements.forEach(({ target, replacement }) => {
        const regex = new RegExp(target, 'g');
        updatedContent = updatedContent.replace(regex, replacement);
      });

      // Write the updated content back to the file
      await fs.promises.writeFile(absolutePath, updatedContent, 'utf8');
      console.log(`Updated file: ${absolutePath}`);
    } catch (err) {
      console.error(`Error processing file: ${absolutePath}`, err);
    }
  }
};

// Main function
const main = async () => {
  console.log('Starting HTML file update...');
  await updateFiles();
  console.log('HTML file update completed.');
};

main().catch((err) => console.error('An error occurred:', err));

await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating async task
console.log("CDN update completed.");
}