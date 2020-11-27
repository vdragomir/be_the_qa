/*
* This file can be used to load plugins.
* It is called when a project is opened or re-opened (e.g. due to the project's config changing)
*/

const path = require('path');

const getConfigurationByFile = (file) => {
    const pathToConfigFile = path.resolve('config', `${file}.js`);

    return require(pathToConfigFile);
};

const setConfig = (on, config) => {
    const file = config.env.configFile || 'config';

    return getConfigurationByFile(file);
};

module.exports = setConfig;
