var realFavicon = require ('@realfavicongenerator/gulp-real-favicon');
var fs = require('fs');

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
	return gulp.src([ '../apariumUikit/dist/*.html' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FaviconDataFile)).favicon.html_code))
		.pipe(gulp.dest('../apariumUikit/dist/'));
});