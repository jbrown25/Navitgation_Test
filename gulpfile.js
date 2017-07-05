/** Gulpfile.js **/
var gulp = require('gulp');
var sass = require('gulp-sass');
//var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['watch']);

gulp.task('sass', function(){
	return gulp.src('scss/**/*.scss')
	.pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

//watch stuff
gulp.task('watch', function(){
	gulp.watch('scss/**/*.scss', ['sass']);
});