module.exports = function(req, res, next) {
  const values = [];

  values.push("default-src 'none'");
  values.push("script-src 'self'");
  values.push("connect-src 'self'");
  values.push("img-src 'self'");
  values.push("style-src 'self'");
  values.push("media-src 'self'");
  values.push("form-action 'self'");
  values.push("font-src 'self'");
  values.push("child-src 'self'");
  values.push("manifest-src 'self'");
  values.push("report-uri /csp");
  values.push("block-all-mixed-content");

  res.setHeader("Content-Security-Policy", values.join("; "));

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  // https://scotthelme.co.uk/hsts-the-missing-link-in-tls/
  // https://scotthelme.co.uk/hardening-your-http-response-headers/

  // res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
  // res.setHeader("Strict-Transport-Security", "max-age=86400"); // 1 day
  // res.setHeader("X-Frame-Options", "deny");
  // res.setHeader("X-Content-Type-Options", "nosniff");
  // res.setHeader("X-Xss-Protection", "1; mode=block");

  next();
};
