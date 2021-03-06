/*global window, module, require*/
(function () {
    'use strict';

    var helpers = require('./core/helpers'),

        NR = helpers.clone(helpers),

        $config = require('./core/config'),

        $moduleProvider = require('./core/module-provider'),

        $http = require('./core/http');


    // Define the core modules on Dependecy Injector
    $moduleProvider.define('$moduleProvider', function () {
        return $moduleProvider;
    });
    $moduleProvider.define('$config', function () {
        return $config;
    });
    $moduleProvider.define('$http', function () {
        return $http;
    });

    NR.Promise = require('./core/promise');
    NR.ModuleError = require('./core/module-error');

    // Define another modules
    require('./modules/promises');
    require('./modules/log');

    /**
     * <p>Return the current app version</p>
     *
     * @function
     * @memberof NR
     * @returns {string} Current app version
     */
    NR.getAppVersion = function () {
        return $config.get('appVersion');
    };

    /**
     * <p>Define the app version</p>
     *
     * @function
     * @memberof NR
     * @param   {string} [version] App version to set
     */
    NR.setAppVersion = function (version) {
        if (helpers.isDefined(version)) {
            $config.set('appVersion', version);
        }
    };

    /**
     * <p>Return the current app enviroment</p>
     *
     * @function
     * @memberof NR
     * @returns {string} Current app enviroment
     */
    NR.getEnviroment = function () {
        return $config.get('enviroment');
    };

    /**
     * <p>Define the app enviroment</p>
     *
     * @function
     * @memberof NR
     * @param   {string} [version] App enviroment to set
     */
    NR.setEnviroment = function (env) {
        if (helpers.isDefined(env)) {
            $config.set('enviroment', env);
        }
    };

    /**
     * <p>Execute the dependency injection for a function</p>
     *
     * @function
     * @memberof NR
     * @param {function|Array} info Function that will be invoked, can be a function when the
     *                              deps is the arguments names or a array when the firsts
     *                              arguments are the deps and the last argument is the function
     * @param {Object} [scope] Scope where the function will be invoked
     * @returns {Promise} A Promisse that will be resolved when all the dependencies has be resolved
     *                    and the function returns will be passed to the resolve function
     */
    NR.run = function () {
        return $moduleProvider.invoke.apply(null, arguments);
    };

    /**
     * <p>Declare a module executing the dependency injection for it and saving
     * the module return as a new dependency that can be injected</p>
     *
     * @function
     * @memberof NR
     * @param {String} name Module name
     * @param {function|Array} info Module declaration, can be a function when the
     *                              deps is the arguments names or a array when the firsts
     *                              arguments are the deps and the last argument is the function
     * @param {Object} [scope] Module scope
     */
    NR.defModule = function () {
        $moduleProvider.define.apply(null, arguments);
    };


    /**
     * <p>Removes a module previously registered.</p>
     *
     * @function
     * @memberof NR
     * @param {string} name The module name
     */
    NR.undefModule = function (name) {
        $moduleProvider.remove(name);
    };

    /**
     * @classdesc <p>No-Reload main namespace</p>
     *
     * @module NR
     * @namespace
     */
    window.NR = module.exports = NR;
}());
