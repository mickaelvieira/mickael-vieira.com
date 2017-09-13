const jsonParser = require("body-parser").json;
const express = require("express");

const routing = require("./routing.js");
const view = require("./view.js");
const csp = require("./middlewares/csp.js");
const logger = require("./middlewares/logger.js");

const app = express();
const host = "127.0.0.1";
const port = "6001";

app.use(logger);
app.use(csp);
app.use(express.static("./public"));
app.use(jsonParser({ type: "application/csp-report" }));
app.use(jsonParser({ type: "application/json" }));

view(app);
routing(app);

app.listen(port, host, function() {
  console.log(`Listening on http://${host}:${port}`);
});