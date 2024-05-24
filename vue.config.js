// const PublicPath = process.env.BUILD_ENV == "dev" ? "/" : "adminstyle";
const PublicPath = "adminstyle";

module.exports = {
  lintOnSave: process.env.BUILD_ENV == "dev" ? "error" : false,
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        data: `@import '@/assets/css/varibles.scss';`,
      },
    },
  },
  productionSourceMap: false,
  publicPath: PublicPath,
  chainWebpack: config => {
    const buildConfig = require("./src/build/" + process.env.BUILD_ENV + ".js");
    config.plugin("define").tap(args => {
      args[0]["process.env"].BUILD_ENV = JSON.stringify(process.env.BUILD_ENV);
      args[0]["process.env"].API_BASE_URL = JSON.stringify(
        buildConfig.BASE_URL,
      );
      args[0]["process.env"].PublicPath = JSON.stringify(PublicPath);
      return args;
    });
  },
};
