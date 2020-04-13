This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and altered with `reqct-rewired` and `customize-cra` for mannually adjust some configurations on existing webpack configurations.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />

### `npm run http-server`

In order to host static files and avoid certain CORS issues, a new express server is built internally based on `express`.
livenessprobe is for heartbeat health check, which needs no auth at all. 


## Steps for development
### `npm install`
### `npm run start`
will start with webpackdevserver 


## Steps for production
### `npm install`
### `npm run build`
### `npm run http-server` on port 8000 currently

## TODOs
* A better folder structure is required
* lint file missing, should make standard of code lint, e.g. `.eslint`
* More unittest, in terms of time issue, only one extream simple example is presented with Dialog component.
* testing-library with fsevents addon
* CDN upload for all static files, e.g. publicPath in webpack configurations
