import copyFiles from './copy-files.js';
import updateHtml from './update-html.js';
import updateLang from './update-lang.js';
import updateCdn from './update-cdn.js';
import updateMetaTags from './update-meta-tags.js';
import updateTitles from './update-titles.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const pushToGitHub = async () => {
  try {
    console.log('Pushing changes to GitHub...');
    const { stdout } = await execPromise(
      'git add . && git commit -m "Update to theme files" && git push',
      { cwd: '../apariumUikit' }
    );
    console.log('Git push successful:', stdout);
  } catch (err) {
    console.error('Git push failed:', err);
    throw err;
  }
};

const main = async () => {
  try {
    console.log("Starting tasks...");

    // Step 1: Copy files
    await copyFiles();

    // Step 2: Execute update scripts in sequence
    await updateHtml();
    await updateLang();
    await updateCdn();
    await updateMetaTags();
    await updateTitles();

    console.log("All update scripts executed successfully.");

    // Step 3: Push changes to GitHub
    await pushToGitHub();

    console.log("All tasks completed successfully.");
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

main();