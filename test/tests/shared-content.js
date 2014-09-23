define(['lodash', 'shared-content'], function(_, sharedContent) {

    'use strict';

    var q = QUnit;

    q.module('Testing shared-content module');

    q.test('test has methods', 1, function() {
        q.ok(_.isFunction(sharedContent.getSharedContent));
    });

    // TODO - test methods...maybe leverage mocks somehow?
});
