import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

export default async function copyFiles() {

 // Define paths for file and directory copies
const paths = [
  {
    sourcePath: '../dist/css',
    destinationPath: '../apariumUikit/dist/css',
  },
  {
    sourcePath: '../dist/js',
    destinationPath: '../apariumUikit/dist/js',
  },
  {
    sourcePath: '../themes.json',
    destinationPath: '../apariumUikit/dist/themes.json',
  },
  {
    sourcePath: '../tests/js/index.js',
    destinationPath: '../apariumUikit/dist/js/index.js',
  },
  {
    sourcePath: '../tests/js/test.js',
    destinationPath: '../apariumUikit/dist/js/preview.js',
  },
  {
    sourcePath: '../tests/js/test.min.js',
    destinationPath: '../apariumUikit/dist/js/preview.min.js',
  },
  {
    sourcePath: '../custom/favicon',
    destinationPath: '../apariumUikit/dist/favicon',
  },
];

// Copy files and directories
const copyFiles = async () => {
  for (const { sourcePath, destinationPath } of paths) {
    try {
      await fs.promises.cp(sourcePath, destinationPath, { recursive: true });
      console.log(`Copied ${sourcePath} to ${destinationPath} successfully.`);
    } catch (err) {
      console.error(`Error copying from ${sourcePath} to ${destinationPath}:`, err);
    }
  }
};

// Copy HTML files from `tests` to `apariumUikit/dist`
const copyHtmlFiles = async () => {
  const sourceHtmlPath = '../tests';
  const destinationHtmlPath = '../apariumUikit/dist';

  try {
    const entries = await fs.promises.readdir(sourceHtmlPath, { withFileTypes: true });
    for (const entry of entries) {
      const entryPath = path.join(sourceHtmlPath, entry.name);
      if (entry.isFile() && path.extname(entry.name) === '.html') {
        const destPath = path.join(destinationHtmlPath, entry.name);
        await fs.promises.copyFile(entryPath, destPath);
        console.log(`Copied HTML file: ${entryPath} to ${destPath}`);
      }
    }
  } catch (err) {
    console.error(`Error processing HTML files from ${sourceHtmlPath}:`, err);
  }
};


// Main function
const main = async () => {
  await copyFiles();
  await copyHtmlFiles();
};

main();

console.log("Copying files...");
await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating async task
console.log("Files copied successfully.");
}