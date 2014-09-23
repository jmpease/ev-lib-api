define(['lodash', 'media-workflows'], function(_, mediaWorkflows) {

    'use strict';

    var q = QUnit;

    q.module('Testing media-workflows module');

    q.test('test has methods', 1, function() {
        q.ok(_.isFunction(mediaWorkflows.getMediaWorkflows));
    });

    // TODO - test methods...maybe leverage mocks somehow?
});
