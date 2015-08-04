var gulp = require('gulp');
var changed = require('gulp-changed');
var jspm = require('jspm');

gulp.task('jspm', function() {

  gulp.src(['public/assets/jspm_packages/*.js', 'public/assets/jspm_packages/*.js.map'])
      .pipe(changed('assets/jspm_packages/')) // Ignore unchanged files
      .pipe(gulp.dest('assets/jspm_packages/'))

  gulp.src(['app/config.js'])
      .pipe(changed('assets/'))
      .pipe(gulp.dest('assets/'));

  return jspm.bundle('application', 'public/assets/bundle.js',
    {
      // sourceMaps: true,
      // sourceMapContents: true,
      // mangle: false,
      // minify: true,
      // lowResSourceMaps: false,
    });
});
