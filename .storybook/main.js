const path = require("path");
const webpack = require("webpack");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@chakra-ui/storybook-addon",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config, { configType }) => {
    // Mocking out next/config until the storybook addon next fixes a bug to pull in image loaders
    // Source: https://stackoverflow.com/questions/64622746/how-to-mock-next-js-image-component-in-storybook
    // Related issues:
    //   - https://github.com/RyanClementsHax/storybook-addon-next/issues/67
    //   - https://github.com/RyanClementsHax/storybook-addon-next/issues/70

    const nextConfigPath = path.resolve(__dirname, "../next.config.js");
    const nextConfig = require(nextConfigPath);

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.__NEXT_IMAGE_OPTS": JSON.stringify({
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          domains: [],
          ...nextConfig.images,
        }),
      })
    ); // Return the altered config

    return config;
  },
};
