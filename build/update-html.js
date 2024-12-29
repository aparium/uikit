import fs from 'fs';
import path from 'path';

// Directory to process
const directory = '../apariumUikit/dist';

// Target and replacement patterns
const targetPattern = 'js/test.js';
const replacement = 'js/preview.js';

// Function to process and update a file
const processFile = async (filePath) => {
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');

    // Replace the target pattern
    if (content.includes(targetPattern)) {
      const updatedContent = content.replace(
        new RegExp(targetPattern, 'g'),
        replacement
      );

      // Write the updated content back to the file
      await fs.promises.writeFile(filePath, updatedContent, 'utf8');
      console.log(`Updated file: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing file: ${filePath}`, err);
  }
};

// Function to recursively process a directory
const processDirectory = async (dirPath) => {
  try {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(entryPath);
      } else if (entry.isFile() && path.extname(entry.name) === '.html') {
        // Process HTML files
        await processFile(entryPath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory: ${dirPath}`, err);
  }
};

// Main function to initiate processing
const main = async () => {
  console.log('Starting directory processing...');
  await processDirectory(directory);
  console.log('Directory processing completed.');
};

// Run the script
main().catch((err) => console.error('An error occurred:', err));