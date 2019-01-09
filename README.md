# Serverless Offline Global Exporter Plugin

Export all lambda functions to `process.env`


```bash
npm install --save-dev serverless-offline-global-exporter
```

On your `plugins` declaration


```bash
plugins:
  - serverless-offline-global-exporter
  - serverless-offline
```

All declared functions in your `serverless.yml` will be accessible in `process.env.SERVERLESS_FUNCTIONS`


```bash
functions:
  hello:
    handler: mymodule.myhandler
    memorySize: 128
    timeout: 30
```


```javascript

const functionsList = JSON.parse(process.env.SERVERLESS_FUNCTIONS);
const lambdaToInvoke = functionsList[options['FunctionName']];
const lambda = require(lambdaToInvoke['mymodule']);
return lambda[lambdaToInvoke['myhandler']]({foo: 'bar'}, {}, callback);

```