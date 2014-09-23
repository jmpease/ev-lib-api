define(['lodash', 'api'], function(_, api) {

    'use strict';

    var q = QUnit;

    q.module('Testing api module');

    q.test('test has methods', 10, function() {
        q.ok(_.isFunction(api.init));
        q.ok(_.isFunction(api.getAppInfo));
        q.ok(_.isFunction(api.getContent));
        q.ok(_.isFunction(api.getSharedContent));
        q.ok(_.isFunction(api.getCurrentUser));
        q.ok(_.isFunction(api.getIdentityProviders));
        q.ok(_.isFunction(api.getLibraries));
        q.ok(_.isFunction(api.getMediaWorkflows));
        q.ok(_.isFunction(api.getOrganizations));
        q.ok(_.isFunction(api.getPlaylists));
    });

    // TODO - test methods...maybe leverage mocks somehow?
});
