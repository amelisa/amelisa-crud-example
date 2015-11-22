import gulp from 'gulp'
import stylus from 'gulp-stylus'
import concat from 'gulp-concat'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import postcssFilenamePrefix from 'postcss-filename-prefix'

const apps = ['app']
const processors = [autoprefixer, postcssFilenamePrefix]

function css () {
  for (let app of apps) {
    gulp.src(['styles/index.styl', `${app}/**/*.styl`])
      .pipe(stylus({
        'include css': true
      }))
      .pipe(postcss(processors))
      .pipe(concat(`${app}.styles.css`))
      .pipe(gulp.dest('public/css/apps'))
  }
}

gulp.task('css', css)

gulp.task('watch', () => {
  for (let app of apps) {
    gulp.watch(`${app}/**/*.styl`, ['css'])
  }
  gulp.watch('styles/**/*.styl', ['css'])
})

gulp.task('default', ['css', 'watch'])

gulp.task('build', ['css'])
