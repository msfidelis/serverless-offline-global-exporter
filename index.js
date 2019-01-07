'use strict';

const AWS   = require('aws-sdk');

/**
 * 
 */
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
    }

    /**
     * 
     */
    offlineStartInit() {}

}


module.exports = ServerlessLambdaExecution;