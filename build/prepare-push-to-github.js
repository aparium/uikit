import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

// Import the additional scripts
import './copy-files.js';
import './update-html.js';
import './update-lang.js';
import './update-cdn.js';
import './update-meta-tags.js';
import './update-titles.js';

// Run additional scripts
const runAdditionalScripts = async () => {
  try {
    console.log('Running additional scripts...');
    await import('./copy-files.js');
    console.log('Files copied into Github dist successfully.');
    await import('./update-html.js');
    console.log('Update to html executed successfully.');
    await import('./update-lang.js');
    console.log('Update to lang value executed successfully.');
    await import('./update-cdn.js');
    console.log('CDN reference updates executed successfully.');
    await import('./update-meta-tags.js');
    console.log('Injected meta tags successfully.');
    await import('./update-titles.js');
    console.log('Update HTML titles successfully.');
  } catch (err) {
    console.error('Error executing additional scripts:', err);
  }
};

// Push changes to GitHub
const pushToGitHub = async () => {
  const gitCommand = 'git add . && git commit -m "Update to theme files" && git push';
  exec(gitCommand, { cwd: '../apariumUikit' }, (error, stdout, stderr) => {
    if (error) {
      console.error('Git push failed:', stderr);
    } else {
      console.log('Git push successful:', stdout);
    }
  });
};

// Main function
const main = async () => {
  await runAdditionalScripts(); 
  pushToGitHub();
};

main();