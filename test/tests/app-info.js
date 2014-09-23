define(['lodash', 'app-info'], function(_, appInfo) {

    'use strict';

    var q = QUnit;

    q.module('Testing app-info module');

    q.test('test has methods', 1, function() {
        q.ok(_.isFunction(appInfo.getAppInfo));
    });

    // TODO - test methods...maybe leverage mocks somehow?
});
