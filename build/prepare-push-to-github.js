import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

// Import the additional scripts
import './update-html.js';
import './update-lang.js';
import './update-cdn.js';

// Define paths for file and directory copies
const paths = [
  {
    sourcePath: './dist/css',
    destinationPath: './apariumUikit/dist/css',
  },
  {
    sourcePath: './dist/js',
    destinationPath: './apariumUikit/dist/js',
  },
  {
    sourcePath: './themes.json',
    destinationPath: './apariumUikit/themes.json',
  },
  {
    sourcePath: './tests/js/test.js',
    destinationPath: './apariumUikit/dist/js/preview.js',
  },
  {
    sourcePath: './tests/js/test.min.js',
    destinationPath: './apariumUikit/dist/js/preview.min.js',
  },
  {
    sourcePath: './src',
    destinationPath: './apariumUikit/dist',
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
  const sourceHtmlPath = './tests';
  const destinationHtmlPath = './apariumUikit/dist';

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

// Run additional scripts
const runAdditionalScripts = async () => {
  try {
    console.log('Running additional scripts...');
    // Assuming the scripts are self-executing when imported
    await import('./update-html.js');
    console.log('Update to html executed successfully.');
    await import('./update-lang.js');
    console.log('Update to lang value executed successfully.');
    await import('./update-cdn.js');
    console.log('CDN reference updates executed successfully.');
    await import('./generate-inject-markups-favicons.js');
    console.log('Generate favicons executed successfully.');
  } catch (err) {
    console.error('Error executing additional scripts:', err);
  }
};

// Push changes to GitHub
const pushToGitHub = async () => {
  const gitCommand = 'git add . && git commit -m "Update to theme files" && git push';
  exec(gitCommand, { cwd: './apariumUikit' }, (error, stdout, stderr) => {
    if (error) {
      console.error('Git push failed:', stderr);
    } else {
      console.log('Git push successful:', stdout);
    }
  });
};

// Main function
const main = async () => {
  await copyFiles();
  await copyHtmlFiles();
  await runAdditionalScripts(); // Call additional scripts here
  pushToGitHub();
};

main();