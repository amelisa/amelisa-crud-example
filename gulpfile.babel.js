import fs from 'fs'
import gulp from 'gulp'
import stylus from 'gulp-stylus'
import concat from 'gulp-concat'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import postcssFilenamePrefix from 'postcss-filename-prefix'

const appsFolder = 'apps'
let apps = fs.readdirSync(appsFolder)
const processors = [autoprefixer, postcssFilenamePrefix({ignore: /^mdl-/})]

function css () {
  for (let app of apps) {
    gulp.src(['styles/index.styl', `apps/${app}/**/*.styl`])
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
