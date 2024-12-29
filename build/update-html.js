const fs = require('fs');
const path = require('path');

// Directory to process
const directory = './apariumUikit/dist';

const targetPattern = "js/test.js";
const replacement = "js/preview.js";

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
                fs.readFile(entryPath, 'utf8', (err, content) => {
                    if (err) {
                        console.error(`Error reading file: ${entryPath}`, err);
                        return;
                    }

                    // Replace the target pattern
                    if (content.includes(targetPattern)) {
                        const updatedContent = content.replace(
                            new RegExp(targetPattern, 'g'),
                            replacement
                        );

                        fs.writeFile(entryPath, updatedContent, 'utf8', (err) => {
                            if (err) {
                                console.error(`Error writing file: ${entryPath}`, err);
                            } else {
                                console.log(`Updated file: ${entryPath}`);
                            }
                        });
                    }
                });
            }
        });
    });
}

// Start processing from the root directory
processDirectory(directory);