const { src, dest } = require("gulp");

// конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

// плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const js = () => {
  return src(path.js.src, { sourcemaps: app.isDev })
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      })
    )
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest(path.js.dest, { sourcemaps: app.isDev }));
};

module.exports = js;
