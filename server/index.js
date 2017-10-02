const jsonParser = require("body-parser").json;
const express = require("express");

const routing = require("./routing.js");
const view = require("./view.js");
const headers = require("./middlewares/headers.js");
const notFound = require("./middlewares/not-found.js");
const errors = require("./middlewares/errors.js");
const morgan = require("morgan");
const app = express();
const host = "127.0.0.1";
const port = "8000";

morgan.token("remote-addr", function(req) {
  return (
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress
  );
});

app.use(morgan("combined"));
app.use(headers);
app.use(
  express.static("./public", {
    etag: false,
    maxAge: false,
    lastModified: false
  })
);

app.use(jsonParser({ type: "application/csp-report" }));
app.use(jsonParser({ type: "application/json" }));
app.disable("x-powered-by");

view(app);
routing(app);

app.use(notFound);
app.use(errors);
app.listen(port, host, function() {
  console.log(`Listening on http://${host}:${port}`);
});
