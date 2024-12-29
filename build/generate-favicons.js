var realFavicon = require ('@realfavicongenerator/gulp-real-favicon');
var fs = require('fs');

// File where the favicon markups are stored
var FaviconDataFile = 'faviconData.json';

// Generate the icons.
gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: '../src/images/icons/aparium_mark_black.svg',
		dest: '../apariumUikit/dist',
		iconsPath: '/favicon/',
		design: {
			"desktop": {
				"darkIconTransformation": {
					"type": "none",
					"backgroundColor": "#ffffff",
					"backgroundRadius": 0.7,
					"imageScale": 0.7,
					"brightness": 1
				},
				"darkIconType": "specific",
				"regularIconTransformation": {
					"type": "none",
					"backgroundColor": "#ffffff",
					"backgroundRadius": 0.7,
					"imageScale": 0.7,
					"brightness": 1
				}
			},
			"touch": {
				"transformation": {
					"type": "background",
					"backgroundColor": "#ffffff",
					"backgroundRadius": 0,
					"imageScale": 0.6,
					"brightness": 1
				},
				"appTitle": "Aparium"
			},
			"webAppManifest": {
				"transformation": {
					"type": "background",
					"backgroundColor": "#ffffff",
					"backgroundRadius": 0,
					"imageScale": 0.5,
					"brightness": 1
				},
				"name": "Aparium",
				"shortName": "Aparium",
				"backgroundColor": "#ffffff",
				"themeColor": "#ffffff"
			}
		},
		markupFile: FaviconDataFile
	}, function() {
		done();
	});
});

