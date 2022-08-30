const { src, dest } = require("gulp");

// конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

// плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");

// сжатиеи зображений только для prod
// const gulpif = require("gulp-if");
//  .pipe(gulpif(app.isProd, imagemin(app.imagemin)))

const images = () => {
  return src(path.images.src)
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      })
    )
    .pipe(newer(path.images.dest))
    .pipe(webp())
    .pipe(dest(path.images.dest))
    .pipe(src(path.images.src))
    .pipe(newer(path.images.dest))

    .pipe(imagemin(app.imagemin))
    .pipe(dest(path.images.dest));
};

module.exports = images;
