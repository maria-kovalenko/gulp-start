const { src, dest } = require("gulp");

// конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

const htmlMin = require("gulp-htmlmin");
const size = require("gulp-size");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const webpHtml = require("gulp-webp-html");

const html = () => {
  return src(path.html.src)
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      })
    )
    .pipe(webpHtml())
    .pipe(size({ title: "До сжатия" }))
    .pipe(htmlMin(app.htmlMin))
    .pipe(size({ title: "После сжатия" }))
    .pipe(dest(path.html.dest));
};

module.exports = html;
