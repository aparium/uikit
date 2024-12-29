import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

// Convert exec to a promise-based function
const execPromise = (command, options = {}) => {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
      } else {
        resolve(stdout);
      }
    });
  });
};

// Run additional scripts in order
const runAdditionalScripts = async () => {
  try {
    console.log('Running additional scripts...');
    
    // Dynamically import and execute each script
    await import('./copy-files.js');
    console.log('Files copied into Github dist successfully.');

    await import('./update-html.js');
    console.log('Update to HTML executed successfully.');

    await import('./update-lang.js');
    console.log('Update to lang value executed successfully.');

    await import('./update-cdn.js');
    console.log('CDN reference updates executed successfully.');

    await import('./update-meta-tags.js');
    console.log('Injected meta tags successfully.');

    await import('./update-titles.js');
    console.log('Updated HTML titles successfully.');

  } catch (err) {
    console.error('Error executing additional scripts:', err);
    throw err; // Re-throw the error to stop execution
  }
};

// Push changes to GitHub
const pushToGitHub = async () => {
  try {
    console.log('Pushing changes to GitHub...');
    const stdout = await execPromise('git add . && git commit -m "Update to theme files" && git push', {
      cwd: '../apariumUikit',
    });
    console.log('Git push successful:', stdout);
  } catch (err) {
    console.error('Git push failed:', err);
    throw err; // Re-throw the error to stop execution
  }
};

// Main function
const main = async () => {
  try {
    await runAdditionalScripts();
    await pushToGitHub();
    console.log('All tasks completed successfully.');
  } catch (err) {
    console.error('An error occurred during execution:', err);
  }
};

main();