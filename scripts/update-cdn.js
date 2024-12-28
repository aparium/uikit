const fs = require('fs');
const path = require('path');

// List of files to process
const files = [
    './tests/js/index.js',
    './tests/js/test.js',
    './tests/js/test.min.js',
];

// Replacement patterns
const replacements = [
    {
        target: "../dist/js/uikit-icons.js",
        replacement: "'https://cdn.jsdelivr.net/gh/aparium/uikit@develop/dist/js/uikit-icons.js'",
    },
    {
        target: "../dist/js/uikit.js",
        replacement: "https://cdn.jsdelivr.net/gh/aparium/uikit@develop/dist/js/uikit.js",
    },
    {
        target: "../dist/css/uikit-core.css",
        replacement: "'https://cdn.jsdelivr.net/gh/aparium/uikit@develop/dist/css/uikit-core.css",
    },
    {
        target: "'../dist/css/uikit.css",
        replacement: "'https://cdn.jsdelivr.net/gh/aparium/uikit@develop/dist/css/uikit.css",
    },
    {
        target: "../themes.json",
        replacement: "https://cdn.jsdelivr.net/gh/aparium/uikit@develop/themes.json",
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