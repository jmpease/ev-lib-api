define(['lodash', 'identity-providers'], function(_, identityProviders) {

    'use strict';

    var q = QUnit;

    q.module('Testing identity-providers module');

    q.test('test has methods', 1, function() {
        q.ok(_.isFunction(identityProviders.getIdentityProviders));
    });

    // TODO - test methods...maybe leverage mocks somehow?
});
