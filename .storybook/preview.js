import * as NextImage from "next/future/image";

import { initialize, mswDecorator } from "msw-storybook-addon";

initialize();

export const decorators = [mswDecorator];

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <img {...props} />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
