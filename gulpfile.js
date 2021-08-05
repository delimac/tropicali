var gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
var cleanCss = require("gulp-clean-css")
var sourcemaps = require("gulp-sourcemaps")

var browserSync = require("browser-sync").create()

gulp.task("sass", function() {
  // place code for your default task here
  // we need to run "sass css/app.scss app.css --watch"
  return gulp.src("css/app.scss")
    // initialize sourcemaps before starting sass
    .pipe(sourcemaps.init())
    // pipe through sass compiler
    .pipe(sass())
    // clean up the css code
    .pipe(
      cleanCss({
        compatibility: 'ie8'
      })
    )
    // write sourcemaps
    .pipe(sourcemaps.write())
    // where to save compiled css
    .pipe(gulp.dest("."))
    .pipe(browserSync.stream())
});

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
  gulp.watch("css/app.scss", ["sass"])
})

gulp.task('default', ["sass", "watch"])
