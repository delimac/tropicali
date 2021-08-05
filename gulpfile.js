var gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
var cleanCss = require("gulp-clean-css")

gulp.task("sass", function() {
  // place code for your default task here
  // we need to run "sass css/app.scss app.css --watch"
  return gulp.src("css/app.scss")
    // pipe through sass compiler
    .pipe(sass())
    // clean up the css code
    .pipe(cleanCss())
    // where to save compiled css
    .pipe(gulp.dest("."))
});

gulp.task("watch", function () {
  gulp.watch("css/app.scss", ["sass"])
})

gulp.task('default', ["sass", "watch"])
