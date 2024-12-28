const fs = require('fs');
const path = require('path');

const directory = './tests';
const htmlSnippet = `
<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
<link rel="manifest" href=/favicon/site.webmanifest">
<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000">
<link rel="shortcut icon" href="/favicon/favicon.ico">
<meta name="apple-mobile-web-app-title" content="Aparium">
<meta name="application-name" content="Aparium">
<meta name="msapplication-TileColor" content="#000000">
<meta name="msapplication-TileImage" content="/favicon/mstile-144x144.png">
<meta name="msapplication-config" content="/favicon/browserconfig.xml">
<meta name="theme-color" content="#ffffff">
`;

fs.readdir(directory, (err, files) => {
    if (err) {
        console.error(`Error reading directory: ${directory}`, err);
        return;
    }

    files.forEach((file) => {
        const filePath = path.join(directory, file);

        // Check if the file is an HTML file
        if (path.extname(file) === '.html') {
            fs.readFile(filePath, 'utf8', (err, content) => {
                if (err) {
                    console.error(`Error reading file: ${filePath}`, err);
                    return;
                }

                // Check if <head> exists
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
    });
});