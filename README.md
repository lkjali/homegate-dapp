# ArtiDapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

## Install Node.js and the Node Package Manager (NPM)

Go to https://nodejs.org/en/ and install the version for you. NPM is automaticall distributed with Node.js

## Install the Angular Command Line Interface (CLI)

Run `npm install -g @angular/cli` and then the CLI is ready to use.

## Install web3.js the official Ethereum Javascript API

Run `npm install ethereum/web3.js --save` to install it.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Install and use Ethereum Client for testing Smart Contracts (TestRPC)

Run `npm install -g ethereumjs-testrpc`. Once installed run `testrpc`. This provides you with 10 different accounts and private keys, along with a local server at `http://localhost:8545/`.

## Using Remix for testing
Switch over to the Remix IDE, click on the Run tab, and then change the Environment dropdown from Javascript VM to Web3 Provider.

Hit "OK" and then specify the testrpc localhost address (by default, it's http://localhost:8545)

This means that instead of deploying and testing in the Javascript VM, we're now using the TestRPC client on your computer.

# Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
