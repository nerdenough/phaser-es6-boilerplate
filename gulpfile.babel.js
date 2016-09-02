'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import browserify from 'browserify';
import babelify from 'babelify';
import browserSync from 'browser-sync';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import {argv} from 'yargs';

// Customise these directories as needed
const paths = {
  source: './src/',
  build: './build/',
  scripts: './build/scripts',
  static: './static/',
  phaser: './node_modules/phaser/build/'
};

// Builds the application by using babel to convert the ES6 to ES5 and saving
// the output in the build scripts directory as "game.js". The code will be
// minified if the task is run in production mode (using the --production
// argument).
function build() {
  let type = argv.production ? 'production' : 'development';
  gutil.log(gutil.colors.green('Building in ' + type + ' mode...'));

  return browserify(paths.source + '/game.js')
    .transform(babelify, {presets: ['es2015']})
    .bundle()
    .pipe(source('game.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulpif(!argv.production, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.scripts));
}

// Adds phaser.min.js to the build directory. The unminified version and
// sourcemaps for phaser will be copied if the game is built in development
// mode.
function addPhaser() {
  let files = [paths.phaser + '/phaser.min.js'];
  if (!argv.production) {
    files.push(paths.phaser + '/phaser.js');
    files.push(paths.phaser + '/phaser.map');
  }

  return gulp
    .src(files)
    .pipe(gulp.dest(paths.scripts));
}

// Adds files from the static folder to the build directory.
function addStatic() {
  return gulp
    .src(paths.static + '/**/*')
    .pipe(gulp.dest(paths.build));
}

// Lints all JavaScript files in the src folder using ESLint. This is to ensure
// all code follows your preferred convention guidelines. Edit .eslintrc.json to
// customise rules to your liking.
//
// You can optionally supply the --strict argument when running gulp to fail the
// build if code styling errors are found.
function lint() {
  return gulp
    .src(paths.source + '/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulpif(argv.strict, eslint.failAfterError()));
}

// Serves the build directory as a web server. Change "open" to true if you
// want your web browser to be opened automatically.
function serve() {
  browserSync.init({
    server: paths.build,
    open: false
  });
}

// Watches the source and static directories, rebuilding when a change is
// detected.
function watch() {
  gulp.watch(paths.source + '/**/*.js', ['build'], browserSync.reload);
  gulp.watch(paths.static + '/**/*', ['build'], browserSync.reload);
}

// Tasks
gulp.task('add-static', addStatic);
gulp.task('add-phaser', addPhaser);
gulp.task('lint', lint);
gulp.task('watch', watch);
gulp.task('build', ['lint', 'add-static', 'add-phaser'], build);
gulp.task('serve', ['build', 'watch'], serve);
gulp.task('default', ['serve']);
