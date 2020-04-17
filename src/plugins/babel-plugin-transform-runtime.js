const babelPluginTransformRuntime = {
    useESModules: [
        '@babel/plugin-transform-runtime',
        {
            version: '^7.9.0',
            corejs: 3,
            proposals: true,
            useESModules: true
        }
    ],
    useCJS: [
        '@babel/plugin-transform-runtime',
        {
            version: '^7.9.0',
            corejs: 3,
            proposals: true,
            useESModules: false
        }
    ]
};

export {babelPluginTransformRuntime};
