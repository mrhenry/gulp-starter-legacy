var gulp = require('gulp');
var changed = require('gulp-changed');
var jspm = require('jspm');

gulp.task('jspm', function() {

  gulp.src(['public/assets/jspm_packages/*.js', 'public/assets/jspm_packages/*.js.map'])
      .pipe(changed('public/assets/jspm_packages/')) // Ignore unchanged files
      .pipe(gulp.dest('public/assets/jspm_packages/'))

  gulp.src(['public/assets/config.js'])
      .pipe(changed('public/assets/'))
      .pipe(gulp.dest('public/assets/'));

  return jspm.bundle('application', 'public/assets/bundle.js',
    {
      // sourceMaps: true,
      // sourceMapContents: true,
      // mangle: false,
      // minify: true,
      // lowResSourceMaps: false,
    });
});
