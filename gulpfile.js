var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  iconfont = require('gulp-iconfont'),
  consolidate = require('gulp-consolidate');
  
gulp.task('default', function() {
  // place code for your default task here
});


gulp.task('js', function() {
  gulp.src(['./public/js/primus.js', './public/js/app_script.js', './public/js/Chart.min.js', './public/js/intro_tour.js', './public/js/intro.js', './public/js/bootstrap-typeahead.js', './public/js/mention.js'])
    .pipe(uglify()).on('error', errorHandler)
    .pipe(concat('all.js')).on('error', errorHandler)
    .pipe(gulp.dest('./public/js'));
});



gulp.task('css', function() {
  gulp.src(['./public/css/timeline.css', './public/css/introjs.css'])
    .pipe(minifyCSS({
      keepBreaks: true
    }))
    .pipe(concat('all2.css'))
    .pipe(gulp.dest('./public/css/'))
});

gulp.task('css-app', function() {
  gulp.src(['./public/css/timeline.css', './public/css/introjs.css', './public/css/app_css.css', './public/css/font_app.css', './public/css/mentionjs-styles.css'])
    .pipe(minifyCSS({
      keepBreaks: true
    }))
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./public/css/'))
});

gulp.task('font', function() {
  gulp.src(['./public/svg/*.svg'])
    .pipe(iconfont({
      fontName: 'myfont',
      'normalize': true
    }))
    .on('codepoints', function(codepoints, options) {
      gulp.src('templates/myfont.css')
        .pipe(consolidate('lodash', {
          glyphs: codepoints,
          fontName: 'myfont',
          fontPath: './public/font/',
          className: 's'
        }))
        .pipe(gulp.dest('./public/font/'));
    })
    .pipe(gulp.dest('./public/font/'));
});

function errorHandler(error) {
  console.log(error.toString());
  this.emit('end');
}