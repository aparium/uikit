const fs = require('fs');
const path = require('path');

// List of files to process
const files = [
    '../apariumUikit/dist/js/index.js',
    '../apariumUikit/dist/js/preview.js',
    '../apariumUikit/dist/js/preview.min.js',
];

// Replacement patterns
const replacements = [
    {
        target: "../dist/js/uikit-icons.js",
        replacement: "./uikit-icons.js",
    },
    {
        target: "../dist/js/uikit.js",
        replacement: "./uikit.js",
    },
    {
        target: "../dist/css/uikit-core.css",
        replacement: "../css/uikit-core.css",
    },
    {
        target: "'../dist/css/uikit.css",
        replacement: "../css/uikit.css",
    },
];

files.forEach((filePath) => {
    // Ensure the file exists
    if (fs.existsSync(filePath) && path.extname(filePath) === '.js') {
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                console.error(`Error reading file: ${filePath}`, err);
                return;
            }

            let updatedContent = content;
            let changed = false;

            // Perform all replacements
            replacements.forEach(({ target, replacement }) => {
                if (updatedContent.includes(target)) {
                    updatedContent = updatedContent.replace(new RegExp(target, 'g'), replacement);
                    changed = true;
                }
            });

            // Write the file only if changes were made
            if (changed) {
                fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
                    if (err) {
                        console.error(`Error writing file: ${filePath}`, err);
                    } else {
                        console.log(`Updated file: ${filePath}`);
                    }
                });
            } else {
                console.log(`No changes needed for file: ${filePath}`);
            }
        });
    } else {
        console.error(`File not found or not a JavaScript file: ${filePath}`);
    }
});