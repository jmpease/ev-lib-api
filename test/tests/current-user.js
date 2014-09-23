define(['lodash', 'current-user'], function(_, currentUser) {

    'use strict';

    var q = QUnit;

    q.module('Testing current-user module');

    q.test('test has methods', 1, function() {
        q.ok(_.isFunction(currentUser.getCurrentUser));
    });

    // TODO - test methods...maybe leverage mocks somehow?
});
