const path = require("path");
const hbs = require("hbs");
const caches = require("../caches.json");

module.exports = function(app) {
  hbs.registerHelper("assets", function(path) {
    return caches.hashes.hasOwnProperty(path) ? caches.hashes[path] : path;
  });

  hbs.registerPartials(__dirname + "/views/partials");

  app.set("views", __dirname + "/views/pages");
  app.set("view engine", "html");
  app.engine("html", hbs.__express);
};
