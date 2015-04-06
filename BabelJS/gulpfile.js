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

var config = {
    //Include all js files but exclude any min.js files
    //src: ['app/**/*.js', '!app/**/*.min.js'],
    src : ["Scripts/src/*.js"]
};

var watch = require('gulp-watch');
gulp.task('watch', function(){
    return gulp.watch(config.src, ['default']);
});