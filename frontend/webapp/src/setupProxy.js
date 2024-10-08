const { createProxyMiddleware } = require("http-proxy-middleware");

console.log("setupProxy.js is being loaded!");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://apig.misarodeo.com",
      changeOrigin: true,
    })
  );
  app.use(
    "/login",
    createProxyMiddleware({
      target: "https://apig.misarodeo.com",
      changeOrigin: true,
    })
  );
  app.use(
    "d2uoi63j88ocg6.cloudfront.net",
    createProxyMiddleware({
      target: "https://d2uoi63j88ocg6.cloudfront.net",
      changeOrigin: true,
      pathRewrite: {
        "^/d2uoi63j88ocg6.cloudfront.net": "",
      },
    })
  );
};
