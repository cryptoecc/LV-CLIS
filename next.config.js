module.exports = {
  reactStrictMode: false,
  webpack5: true,

  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.module.rules.push({
      test: /\.(numbers|xls|xlsx|xlsb|node$)/,
      use: [
        {
          loader: "./base64-loader",
        },
      ],
    });
    console.log(config);
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", // "/api/"로 시작하는 모든 API 경로와 매치
        destination: "https://openapi.naver.com/:path*", // 사용하려는 API의 기본 URL로 변경
      },
    ];
  },
};
