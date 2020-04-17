const {engines} = require('./package.json');

/**
 * @typedef babelConfigApiCacheType
 * @property {function(function(): *): *} using - Cache using method.
 */

/**
 * @typedef babelConfigApiType
 * @property {babelPresetDefaultApiCacheType} cache - Api cache.
 */

const targets = {
    node: engines.node.replace(/[^0-9.]/g, '')
};

const codisticaLicense = `/**
 * @license Codistica
 *
 * Copyright (c) 2019, Codistica and its affiliates.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * BUILD DATE: ${new Date().toString()}
 */`;

/**
 * @function babelConfig
 * @description Babel configuration function.
 * @param {babelConfigApiType} api - Babel API.
 * @returns {Object<string,*>} Babel config.
 */
module.exports = function babelConfig(api) {
    // GET NEEDED PROCESS ENV VARIABLES
    const ESModules = process.env.NPM_CONFIG_ES_MODULES === 'true';

    if (api) {
        // SETUP CACHE
        api.cache.using(() => ESModules);
    }

    return {
        plugins: [
            [
                '@comandeer/babel-plugin-banner',
                {
                    banner: codisticaLicense
                }
            ]
        ],
        presets: [
            [
                '@babel/preset-env',
                {
                    spec: true,
                    modules: ESModules? false : 'auto',
                    targets: targets,
                    ignoreBrowserslistConfig: true
                }
            ]
        ]
    };
};
