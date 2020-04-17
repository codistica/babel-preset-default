const date = new Date();

const codisticaLicense = `/**
 * @license Codistica
 *
 * Copyright (c) ${date.getFullYear()}, Codistica and its affiliates.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * BUILD DATE: ${date.toString()}
 */`;

const babelPluginBanner = [
    '@comandeer/babel-plugin-banner',
    {
        banner: codisticaLicense
    }
];

export {babelPluginBanner};
