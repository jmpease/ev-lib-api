define(['lodash', 'libraries'], function(_, libraries) {

    'use strict';

    var q = QUnit;

    q.module('Testing libraries module');

    q.test('test has methods', 1, function() {
        q.ok(_.isFunction(libraries.getLibraries));
    });

    // TODO - test methods...maybe leverage mocks somehow?
});
