const webpack = require("webpack");

module.exports = function override(config, env) {
  // define polyfill fallbacks
  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve("buffer"),
    util: require.resolve("util"),
    stream: require.resolve("stream-browserify"),
    crypto: require.resolve("crypto-browserify"),
    'process/browser': require.resolve('process/browser')
  };

  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];

  // define plugins
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  return config;
};
