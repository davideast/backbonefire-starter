var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var port = process.env.port || 3123;

gulp.task('open', function(){
  var options = { url: 'http://localhost:' + port };
  gulp.src('./app/index.html')
      .pipe(open('', options));
});

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    port: port,
    livereload: true
  });
});

gulp.task('bower', function() {
  gulp.src('./bower_components/**/*.min.js')
  .pipe(flatten())
  .pipe(gulp.dest('.app/src/js/lib'));
});

gulp.task('bower', function(){
  gulp.src(['./bower_components/backbone/backbone.js',
            './bower_components/firebase/firebase.js',
            './bower_components/underscore/underscore.js',
            './bower_components/backbonefire/dist/backbonefire.js'])
      .pipe(gulp.dest('./app/src/lib'));
});

gulp.task('build', function() {
  gulp.src('./app/src/js/**/*.js')
      .pipe(gulp.dest('./app/dist/js'));
});

gulp.task('js', function() {
  gulp.src('./app/dist/**/*.js')
      .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('./app/*.html')
      .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('app/dist/js/*.js', ['js']);
  gulp.watch('app/index.html', ['html']);
  gulp.watch('app/src/js/**/*.js', ['build']);
});

gulp.task('default', ['bower', 'build']);

gulp.task('serve', ['default', 'connect', 'open', 'watch']);
