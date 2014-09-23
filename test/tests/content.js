define(['lodash', 'content'], function(_, content) {

    'use strict';

    var q = QUnit;

    q.module('Testing content module');

    q.test('test has methods', 1, function() {
        q.ok(_.isFunction(content.getContent));
    });

    // TODO - test methods...maybe leverage mocks somehow?
});
