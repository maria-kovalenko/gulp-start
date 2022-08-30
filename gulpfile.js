const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

// конфигурация
const path = require("./config/path.js");
const app = require("./config/app.js");

// задачи
const clear = require("./task/clear.js");
const html = require("./task/html.js");
const scss = require("./task/scss.js");
const js = require("./task/js.js");
const images = require("./task/images.js");
const fonts = require("./task/fonts.js");

// наблюдение
const watcher = () => {
  watch(path.html.watch, html).on("all", browserSync.reload);
  watch(path.scss.watch, scss).on("all", browserSync.reload);
  watch(path.js.watch, js).on("all", browserSync.reload);
  watch(path.images.watch, images).on("all", browserSync.reload);
  watch(path.fonts.watch, fonts).on("all", browserSync.reload);
};

// сервер
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root,
    },
  });
};

const build = series(clear, parallel(html, scss, js, images, fonts));

const dev = series(build, parallel(watcher, server));

exports.html = html;
exports.watch = watcher;
exports.clear = clear;
exports.scss = scss;
exports.js = js;
exports.images = images;
exports.fonts = fonts;

// сборка
exports.default = app.isProd ? build : dev;
