const realFavicon = require('@realfavicongenerator/gulp-real-favicon');
const fs = require('fs');

// File where the favicon markups are stored
const FaviconDataFile = 'faviconData.json';

// Generate the icons
function generateFavicon() {
  return new Promise((resolve, reject) => {
    realFavicon.generateFavicon(
      {
        masterPicture: '../src/images/icons/aparium_mark_black.svg',
        dest: '../apariumUikit/dist',
        iconsPath: '/favicon/',
        design: {
          desktop: {
            darkIconTransformation: {
              type: 'none',
              backgroundColor: '#ffffff',
              backgroundRadius: 0.7,
              imageScale: 0.7,
              brightness: 1,
            },
            darkIconType: 'specific',
            regularIconTransformation: {
              type: 'none',
              backgroundColor: '#ffffff',
              backgroundRadius: 0.7,
              imageScale: 0.7,
              brightness: 1,
            },
          },
          touch: {
            transformation: {
              type: 'background',
              backgroundColor: '#ffffff',
              backgroundRadius: 0,
              imageScale: 0.6,
              brightness: 1,
            },
            appTitle: 'Aparium',
          },
          webAppManifest: {
            transformation: {
              type: 'background',
              backgroundColor: '#ffffff',
              backgroundRadius: 0,
              imageScale: 0.5,
              brightness: 1,
            },
            name: 'Aparium',
            shortName: 'Aparium',
            backgroundColor: '#ffffff',
            themeColor: '#ffffff',
          },
        },
        markupFile: FaviconDataFile,
      },
      () => resolve()
    );
  });
}

// Inject the favicon markups in your HTML pages
function injectFaviconMarkups() {
  const htmlCode = JSON.parse(fs.readFileSync(FaviconDataFile)).favicon.html_code;

  const htmlFiles = ['../apariumUikit/dist']; // Replace with your HTML file paths
  htmlFiles.forEach((filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${filePath}`, err);
        return;
      }

      const updatedContent = data.replace(/<head>/, `<head>\n${htmlCode}`);
      fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file: ${filePath}`, err);
        } else {
          console.log(`Updated file: ${filePath}`);
        }
      });
    });
  });
}

// Main function to run tasks
async function main() {
  try {
    await generateFavicon();
    console.log('Favicon generation completed.');
    injectFaviconMarkups();
    console.log('Favicon markup injection completed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Run the script
main();