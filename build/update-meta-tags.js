import fs from 'fs';
import path from 'path';

export default async function updateMetaTags() {

const directory = '../apariumUikit/dist';

const htmlSnippet = `
<link rel="icon" type="image/png" href="favicon/favicon-96x96.png" sizes="96x96" >
<link rel="icon" type="image/svg+xml" href="favicon/favicon.svg" >
<link rel="shortcut icon" href="favicon/favicon.ico" >
<link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" >
<meta name="apple-mobile-web-app-title" content="Aparium" >
<link rel="manifest" href="favicon/site.webmanifest" >
`;

function processDirectory(dirPath) {
    fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error(`Error reading directory: ${dirPath}`, err);
            return;
        }

        entries.forEach((entry) => {
            const entryPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                // Recursively process subdirectories
                processDirectory(entryPath);
            } else if (entry.isFile() && path.extname(entry.name) === '.html') {
                // Process HTML files
                processHtmlFile(entryPath);
            }
        });
    });
}

function processHtmlFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            console.error(`Error reading file: ${filePath}`, err);
            return;
        }

        if (content.includes('<head>')) {
            // Insert the snippet after <head>
            const updatedContent = content.replace('<head>', `<head>\n${htmlSnippet}`);
            fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
                if (err) {
                    console.error(`Error writing file: ${filePath}`, err);
                } else {
                    console.log(`Updated file: ${filePath}`);
                }
            });
        } else {
            console.warn(`No <head> tag found in: ${filePath}`);
        }
    });
}

// Start processing from the root directory
processDirectory(directory);


await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating async task
console.log("Meta tags update completed.");
}