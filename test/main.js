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
    'test/api',
    'test/app-info',
    'test/content',
    'test/shared-content',
    'test/current-user',
    'test/identity-providers',
    'test/libraries',
    'test/media-workflows',
    'test/organizations',
    'test/playlists'
  ];

  require(testModules, function() {
    QUnit.start();
  });

}());
