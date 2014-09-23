# ev-lib-api

Ensemble Video API wrapper library proof of concept.

## Getting Started

Make sure you have the latest packages installed

```
npm install
bower install
```

Note: If you don't have `npm` installed, make sure you have
[node](http://nodejs.com) installed. If you don't have bower,
`npm install -g bower`.

The above steps will download all the required software to
build and run this app, such as [grunt](http://gruntjs.com),
[requirejs](http://requirejs.org), and [jquery](http://jquery.com).

## Running the server

You can run the demo using `grunt demo`. This will start a
server on `localhost:8000`, meaning you can simply go to the
url [localhost:8000/index.htm](http://localhost:8000/index.htm)
while it's running.

## Building the application

This application uses requirejs to load the various modules in
the src folder. However, upon build, all of these files are
concatenated and minified together to create a small, compressed
javascript file. These files are wrapped to support loading with
AMD or browser globals.

Running `grunt` by itself will run through all of the steps of
linting the javascript, building out dependencies and ultimately
creating `/dist/ev-lib-api.js` and `/dist/ev-lib-api.min.js`.

### Tests

Note: you need [phantomJS](http://phantomjs.org) to run the tests.
The test directory uses `qunit`, which is run using phantomJS
in the console, but can also be ran by launching the server
`grunt demo` and going to `localhost:8000/test/index.html`.

Create test modules in the `test/tests` folder and require them
in `test/main.js`.
