import {declare} from '@babel/helper-plugin-utils';
import {getTestMethodUtility} from './modules/get-test-method-utility.js';
import {babelPresetEnv} from './presets/babel-preset-env.js';
import {babelPresetFlow} from './presets/babel-preset-flow.js';
import {babelPresetReact} from './presets/babel-preset-react.js';
import {babelPluginBanner} from './plugins/babel-plugin-banner.js';
import {babelPluginProposalClassProperties} from './plugins/babel-plugin-proposal-class-properties.js';
import {babelPluginTransformRuntime} from './plugins/babel-plugin-transform-runtime.js';

/**
 * @typedef babelPresetDefaultOptionsType
 * @property {boolean} [ESModules=false] - Preserve ES6 modules export/import syntax.
 * @property {boolean} [noBanner=false] - Do not add Codistica's banner.
 * @property {Array<(RegExp|string)>} [reactPackages=[]] - React packages path array.
 */

/**
 * @typedef babelPresetDefaultApiCacheType
 * @property {function(function(): *): *} using - Cache using method.
 */

/**
 * @typedef babelPresetDefaultApiType
 * @property {babelPresetDefaultApiCacheType} cache - API cache.
 */

/**
 * @description Preset builder.
 * @param {babelPresetDefaultApiType} api - Babel API.
 * @param {babelPresetDefaultOptionsType} options - Preset options.
 * @returns {Object<string,*>} Preset generated config.
 */
const builder = function builder(api, options) {
    const ESModules = typeof options.ESModules === 'boolean' ? options.ESModules :  api.cache.using(() => process.env.NPM_CONFIG_ES_MODULES === 'true');

    const presets = [
        ESModules ? babelPresetEnv.preserveModules : babelPresetEnv.autoModules
    ];

    const plugins = [
        ESModules ? babelPluginTransformRuntime.useESModules : babelPluginTransformRuntime.useCJS,
        babelPluginProposalClassProperties
    ];

    const overrides = [];

    if (!options.noBanner) {
        plugins.push(babelPluginBanner)
    }

    if (Array.isArray(options.reactPackages)) {
        overrides.push({
            test: getTestMethodUtility(options.reactPackages),
            presets: [
                ESModules
                    ? babelPresetEnv.preserveModules
                    : babelPresetEnv.autoModules,
                babelPresetReact,
                babelPresetFlow
            ]
        });
    }

    return {
        presets,
        plugins,
        overrides
    };
};

const babelPresetDefault = declare(builder);

export {babelPresetDefault};
export default babelPresetDefault;
