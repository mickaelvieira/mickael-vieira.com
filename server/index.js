const jsonParser = require("body-parser").json;
const express = require("express");

const routing = require("./routing.js");
const view = require("./view.js");
const csp = require("./middlewares/csp.js");
const headers = require("./middlewares/headers.js");
const morgan = require("morgan");
const app = express();
const host = "127.0.0.1";
const port = "8000";

//get real ip if passed by nginx
morgan.token("remote-addr", function(req) {
  return (
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress
  );
});

app.use(morgan("combined"));
app.use(csp);
app.use(headers);
app.use(express.static("./public"));
app.use(jsonParser({ type: "application/csp-report" }));
app.use(jsonParser({ type: "application/json" }));
app.disable("x-powered-by");

view(app);
routing(app);

app.listen(port, host, function() {
  console.log(`Listening on http://${host}:${port}`);
});
