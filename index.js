'use strict';

const path = require("path");
const fs = require('fs');


class ServerlessLambdaExecution {

    /**
     * Constructor 
     * @param {*} serverless 
     * @param {*} options 
     */
    constructor(serverless, options) {
        this.serverless = serverless;
        this.service    = serverless.service;
        this.options    = options;
        this.hooks = { 'before:offline:start:init': this.offlineStartInit.bind(this) };
        this.functions = {};
    }

    /**
     * Start Hook
     */
    offlineStartInit() {
        Object.keys(this.serverless.service.functions)
            .forEach(funcName => 
                this._addFunction(funcName, this.serverless.service.functions[funcName]));
    }

    /**
     * Require a Function
     * @param {*} funcName 
     */
    _build(name, handler) {

        const filename = `${handler.path}.js`;

        const funcPath = path.join(
            this.serverless.config.servicePath,
            this.location || "", filename);

        const obj = {
            module: funcPath,
            handler: handler.func
        }

        if (fs.existsSync(funcPath)) {
            this._setEnvironment(name);
            this.functions[name] = obj;
            process.env.SERVERLESS_FUNCTIONS = JSON.stringify(this.functions);
        } else {
            console.log(`function ${funcPath - handler.func} inexistent`);
            return false;
        }

    }

    /**
     * Parse Handler function 
     */
    _parserHandler(func) {
        return new Promise((resolve, reject) => {
            const parts = func.handler.split(".");
            resolve({
                path: parts[0],
                func: parts[1]
            });
        });
    }

    /**
     * Add function pro process.env
     * @param {*} functions 
     */
    _addFunction(name, func) {
        this._parserHandler(func)
            .then(handler => this._build(name, handler))
    }

    /**
     * Export Environment Variables require functions
     * @param {*} funcName 
     */
    _setEnvironment(funcName) {
        const providerEnvVars = this.serverless.service.provider.environment || {};
        const functionEnvVars = this.serverless.service.functions[funcName].environment || {};
        Object.assign(process.env, providerEnvVars, functionEnvVars);
      }
    

}


module.exports = ServerlessLambdaExecution;