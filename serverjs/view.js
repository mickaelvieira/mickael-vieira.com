const path = require("path");
const hbs = require("hbs");
const caches = require("../caches.json");

module.exports = function(app) {
  hbs.registerHelper("assets", function(path) {
    return caches.hashes.hasOwnProperty(path) ? caches.hashes[path] : path;
  });

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "html");
  app.engine("html", hbs.__express);
};
