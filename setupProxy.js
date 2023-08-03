// setupProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // 프록시를 적용할 경로
    createProxyMiddleware({
      target: "https://openapi.naver.com", // 프록시할 대상 주소
      changeOrigin: true,
      headers: {
        "X-Naver-Client-Id": process.env.NEXT_PUBLIC_API_KEY_NAVER_ID,
        "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_API_KEY_NAVER_PW,
      },
    })
  );
};
