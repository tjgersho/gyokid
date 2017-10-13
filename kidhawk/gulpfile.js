var gulp = require('gulp');
var babel = require('gulp-babel');


gulp.task('server', [], function () {
  console.log('BUILDING-SERVER');    
  return gulp.src(['server/*.js'])
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('./'));
});
