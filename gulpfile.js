var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var $             = require('gulp-load-plugins')();
var autoprefixer  = require('autoprefixer');

var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

function sass() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] })
    ]))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
};

function js_vendor() {
  console.log('here');
  return gulp.src('js/vendor.js')
    .pipe($.include())
      .on('error', console.log)
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}


function js() {
  return gulp.src(
    'js/app.js',
    {sourcemaps: true})
  .pipe($.uglify())
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("scss/*.scss", sass);
  gulp.watch("js/app.js", js);
  gulp.watch("*.html").on('change', browserSync.reload);
}

gulp.task('sass', sass);
gulp.task('js', js);
gulp.task('js_vendor', js_vendor);
gulp.task('serve', gulp.series('sass', 'js_vendor', 'js', serve));
gulp.task('default', gulp.series('sass', 'js_vendor', 'js', serve));
