import sourcemaps from 'gulp-sourcemaps'
import mainBowerFiles from 'main-bower-files'

import sourcemapsInit from '../pipes/sourcemapsInit'
import sourcemapsWrite from '../pipes/sourcemapsWrite'

import {
  getConfig,
} from '../ConfigStore'

import {
  isProduction,
  vendor,
} from '../refs'

let config = getConfig()

vendor.gulp().task('webapp-build-bower-scripts', () => {
  let bowerFiles
  try {
    bowerFiles = mainBowerFiles({
      filter: /\.js$/
    })
  } catch (error) {
    bowerFiles = []
  }

  return vendor.gulp()
      .src(bowerFiles)
      .pipe(sourcemapsInit())
      .pipe(sourcemapsWrite())
      .pipe(vendor.gulp().dest('tmp/webapp/00-vendor'))
})

vendor.gulp().task('webapp-build-bower-styles', () => {
  let bowerFiles
  try {
    bowerFiles = mainBowerFiles({
      filter: /\.css/
    })
  } catch (error) {
    bowerFiles = []
  }

  return vendor.gulp()
      .src(bowerFiles)
      .pipe(sourcemapsInit())
      .pipe(sourcemapsWrite())
      .pipe(vendor.gulp().dest('tmp/webapp/00-vendor'))
})

vendor.gulp().task('webapp-build-bower-assets', () => {
  let bowerFiles
  try {
    bowerFiles = mainBowerFiles({
      filter: /^(?!.*(js|css)).*$/
    })
  } catch (error) {
    bowerFiles = []
  }

  return vendor.gulp()
      .src(bowerFiles)
      .pipe(vendor.gulp().dest(config.paths.public))
})
