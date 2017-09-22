module.exports = function(req, res, next) {
  const values = [];

  values.push("default-src 'none'");
  values.push("connect-src 'none'");
  values.push("media-src 'none'");
  values.push("form-action 'none'");
  values.push("child-src 'none'");
  values.push("frame-ancestors 'none'");

  values.push("script-src 'self'");
  values.push("img-src 'self'");
  values.push("style-src 'self'");
  values.push("font-src 'self'");
  values.push("manifest-src 'self'");
  values.push("report-uri /csp");

  values.push("sandbox");
  values.push("block-all-mixed-content");

  res.setHeader("Content-Security-Policy", values.join("; "));

  next();
};
