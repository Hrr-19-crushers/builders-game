const gulp = require('gulp');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');

gulp.task('typescript', () => {
  const tsProject = ts.createProject('gulpconfig.json');
  return tsProject.src()
    .pipe(tsProject())
    //.pipe(uglify())
    .pipe(gulp.dest('engine/'));
});

gulp.task('watch', () => {
  gulp.watch('engine/engine.ts', ['typescript']);
});

gulp.task('build', ['typescript']);

gulp.task('default', ['watch']);