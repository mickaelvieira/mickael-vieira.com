module.exports = function(req, res, next) {
  const values = [];

  values.push("default-src 'self'");

  values.push("media-src 'none'");
  values.push("form-action 'none'");
  values.push("frame-ancestors 'none'");

  values.push("script-src 'self'");
  values.push("img-src 'self'");
  values.push("style-src 'self'");
  values.push("font-src 'self'");
  values.push("manifest-src 'self'");

  /**
   * Although worker-src is the future,
   * I does not work at the moment and
   * I need to set all of these to allow the service worker
   */
  values.push("worker-src 'self'");
  values.push("connect-src 'self'");
  values.push("child-src 'self'");

  values.push("report-uri /csp");

  // I need to investigate further this directive
  // values.push("sandbox allow-scripts allow-same-origin");
  values.push("block-all-mixed-content");

  res.setHeader("Content-Security-Policy", values.join("; "));

  next();
};
