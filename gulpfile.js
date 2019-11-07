var gulp =            require('gulp'),
    browserSync =     require('browser-sync').create(),
    sass =            require('gulp-sass'),
    uglify =          require('gulp-uglify'),
    autoprefixer =    require('gulp-autoprefixer'),
    cleanCSS =        require('gulp-clean-css'),
    imagemin =        require('gulp-imagemin'),
    nunjucksRender =  require('gulp-nunjucks-render'),
    htmlmin =         require('gulp-htmlmin'),
    purgecss =        require('gulp-purgecss'),
    rsync =           require('gulp-rsync')

// static server + watching scss/html files
gulp.task('serve', ['sass', 'nunjucks-html-watch'], function() {
    browserSync.init({
        server: {
            baseDir: './build',
            serveStaticOptions: {
                extensions: ['html']
            }
        },
        host: 'localhost',
        notify: false
    });

    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('./**/*.html', ['nunjucks-html-watch'])
});

// CSS auto prefixer + move to static build
gulp.task('sass', function() {
    return gulp.src(['scss/*.scss'])
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(
          purgecss({
            content: ['./**/**/*.html', 'js/*.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js']
          })
        )
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

// move Bootstrap to static build
gulp.task('bootstrapjs', function() {
    return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
      .pipe(gulp.dest('build/js'));
});

// JS compression + move to static build
gulp.task('compressJs', function () {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

// image compression + move to static build
gulp.task('compressImage', function () {
    return gulp.src('img/**')
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest('build/img'))
});

// template rendering + move to static build
gulp.task('nunjucks', function() {
  return gulp.src('pages/**/*.+(html|nunjucks)')
    .pipe(nunjucksRender({
      path: ['templates']
    }))
    .pipe(htmlmin(
      {
        collapseWhitespace: true,
        removeComments: true
      }))
    .pipe(gulp.dest('build'))
});

// move .htaccess to static build
gulp.task('htaccess', function () {
  return gulp.src('.htaccess')
      .pipe(gulp.dest('build'))
});

// create a task that ensures the `nunjucks` task is complete before reloading browsers
gulp.task('nunjucks-html-watch', ['nunjucks'], function () {
  browserSync.reload();
});

// compile project
gulp.task('build-project',
  ['sass', 'bootstrapjs', 'compressImage', 'compressJs', 'nunjucks', 'htaccess']);

// compile and start project
gulp.task('default', ['build-project', 'serve']);

// deploy to development server
gulp.task('deploy-development', function() {
  return gulp.src('build/**/**')
    .pipe(rsync({
      root: 'build/',
      hostname: '',
      username: '',
      destination: '',
    }));
});

// deploy to production server
gulp.task('deploy-production', function() {
  return gulp.src('build/**/**')
    .pipe(rsync({
      root: 'build/',
      hostname: '',
      username: '',
      destination: '',
    }));
});