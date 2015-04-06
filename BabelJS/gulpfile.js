var gulp = require("gulp");
var babel = require("gulp-babel");
var dest = require('gulp-dest');
var rename = require('gulp-rename');

gulp.task("default", function () {
    return gulp.src("Scripts/src/app.js")
      .pipe(babel())
      .pipe(rename(function (path) {
          path.basename += "-cmpl";
      }))
      .pipe(gulp.dest("Scripts/src"));
});
