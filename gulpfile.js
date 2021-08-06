var gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
var cleanCss = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')

var browserSync = require('browser-sync').create()

var imagemin = require('gulp-imagemin')

gulp.task("sass", function() {
  // place code for your default task here
  // we need to run "sass css/app.scss app.css --watch"
  return gulp.src("src/css/app.scss")
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
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
});

gulp.task("html", function () {
  return gulp.src("src/index.html")
    .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function () {
  return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function () {
  return gulp.src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
})

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  })
  gulp.watch("src/index.html", ["html"]).on("change", browserSync.reload)
  gulp.watch("src/css/app.scss", ["sass"])
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/img/*", ["images"])
})

gulp.task('default', ["html", "sass", "fonts", "images", "watch"])
