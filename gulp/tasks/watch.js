/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp   = require('gulp');
var config = require('../config');
var watch  = require('gulp-watch');

gulp.task('watch', ['images', 'iconFont', 'sass', 'fonts', 'jspm','browserSync'], function(callback) {
  watch(config.sass.src, function() { gulp.start('sass'); });
  watch(config.images.src, function() { gulp.start('images'); });
  watch(config.fonts.src, function() { gulp.start('fonts'); });
  watch(config.iconFont.src, function() { gulp.start('iconFont'); });
  watch('public/assets/app/**/*.js', function() { gulp.start('jspm'); });
});
