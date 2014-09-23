define(['lodash', 'organizations'], function(_, organizations) {

    'use strict';

    var q = QUnit;

    q.module('Testing organizations module');

    q.test('test has methods', 1, function() {
        q.ok(_.isFunction(organizations.getOrganizations));
    });

    // TODO - test methods...maybe leverage mocks somehow?
});
