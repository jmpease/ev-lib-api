define(['lodash', 'playlists'], function(_, playlists) {

    'use strict';

    var q = QUnit;

    q.module('Testing playlists module');

    q.test('test has methods', 1, function() {
        q.ok(_.isFunction(playlists.getPlaylists));
    });

    // TODO - test methods...maybe leverage mocks somehow?
});
