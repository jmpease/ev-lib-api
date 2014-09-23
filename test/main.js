(function() {

  'use strict';

  QUnit.config.autostart = false;

  require.config({
    baseUrl: '../src',
    paths: {
      'jquery': '../../bower_components/jquery/dist/jquery',
      'base64': '../../bower_components/base64/base64',
      'lodash': '../../bower_components/lodash/dist/lodash',
      'test': '../test/tests'
    }
  });

  var testModules = [
    'test/app-info',
    'test/content',
    'test/current-user'
  ];

  require(testModules, function() {
    QUnit.start();
  });

}());
