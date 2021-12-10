# TypeScript Microservice or Backend for Frontend with Node.js

Built using Cloud Native Starter Kit Template - specifically the template for TypeScript node.js services.

## Service API

`https://localhost/<operation>?operands=<parameters>`

For example: `https://localhost/add?operands=X,V,I`

## Key files:

I divided my service into 4 classes:

* `CalculatorAdd<type>`
* `CalculatorDiv<type>`
* `CalculatorMult<type>`
* `CalculatorSub<type>`

Which are represented in the following files:

`/src/controllers`

* `calculator-add-controller.ts`
* `calculator-div-controller.ts`
* `calculator-mult-controller.ts`
* `calculator-sub-controller.ts`

`/src/services`

* `calculator-add-service.ts`
* `calculator-div-service.ts`
* `calculator-mult-service.ts`
* `calculator-sub-service.ts`

The main function that does all of the conversion and math:

* `/src/util/calc-utils.ts`
* Uses `Axios` for `GET` calls to the conversion service

## Jest Mocks

Tests are all located in:

* `/test/controllers`
* `/test/services`

Mock files are located in:
`/src/mocks`

I am using the Mock Service Worker ([mws](https://mswjs.io)) framework. With it I can contain all of my mock responses in one file (`/src/mocks/handlers.ts`).

**NOTE**: I am using ENV vars to set my conversion service URLS. In order for the mocks to work without these variables, I added dummy values in `/jest.config.js`:

```javascript
process.env = Object.assign(process.env, {
  NUMBER_TO_ROMAN_URL: 'https://localhost/to-roman?value=',
  ROMAN_TO_NUMBER_URL: 'https://localhost/to-number?value='
});
```

## GitHub repos and OpenShift projects

* Conversion service - https://github.com/rhagarty/training-conv
* Conversion service project - `training-rhagarty-conv`
* Calculator service - https://github.com/rhagarty/training-calc
* Calculator service project - `training-rhagarty-calc`

## License

This sample application is licensed under the Apache License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1](https://developercertificate.org/) and the [Apache License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache License FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)



