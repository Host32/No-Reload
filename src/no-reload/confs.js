/*global module, require*/
(function () {
    'use strict';

    var $moduleProvider = require('./module-provider'),

        $confs,

        // Defaults
        configs = {
            enviroment: 'dev',

            appFolder: 'app/',
            modulesFolder: 'app/modules/',
            controllersFolder: 'app/controllers',
            templatesFolder: 'app/templates',
            componentsFolder: 'app/components',
            assetsFolder: 'assets',
            cssFolder: 'assets/css',
            imagesFolder: 'assets/images',

            routeFile: 'app/routes.js',
            helpersFile: 'app/helpers.js',
            constantsFile: 'app/constants.js'
        };

    /**
     * <p>Handles configurations and conventions of the framework</p>
     *
     * @module $configs
     * @memberof NR
     */
    $confs = module.exports = {
        /**
         * <p>Return a registred configuration</p>
         *
         * @param   {string} configName The name of the configuration
         * @returns {*} The value of the configuration
         */
        get: function (configName) {
            return configs[configName];
        },

        /**
         * <p>Register a configuration</p>
         *
         * @param {string} configName The name of the configuration
         * @param {*} value The value of the configuration
         */
        set: function (configName, value) {
            configs[configName] = value;
        }
    };


    // Define this module on Dependecy Injector
    $moduleProvider.define('$confs', function () {
        return $confs;
    });
}());
