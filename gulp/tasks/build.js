var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence')

gulp.task('build', function(cb) {
  var tasks = ['clean',['iconFont', 'images', 'fonts'], ['sass'], ['jspm']];
  if(process.env.RAILS_ENV === 'production') tasks.push('rev');
  tasks.push(cb);
  gulpSequence.apply(this, tasks);
});
