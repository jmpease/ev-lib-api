define(function(require) {

  var _ = require('lodash'),
      appInfo = require('app-info'),
      content = require('content'),
      sharedContent = require('shared-content'),
      currentUser = require('current-user'),
      identityProviders = require('identity-providers'),
      libraries = require('libraries'),
      mediaWorkflows = require('media-workflows'),
      organizations = require('organizations'),
      playlists = require('playlists'),
      config = {};

  function init(options) {
    if (!options) {
      throw 'You need to provide config object';
    }

    _.extend(config, options);
  }

  function getAppInfo() {
    return appInfo.getAppInfo(config);
  }

  function getContent(params) {
    return content.getContent(config, params);
  }

  function getSharedContent(params) {
    return sharedContent.getSharedContent(config, params);
  }

  function getCurrentUser() {
    return currentUser.getCurrentUser(config);
  }

  function getIdentityProviders() {
    return identityProviders.getIdentityProviders(config);
  }

  function getLibraries(params) {
    return libraries.getLibraries(config, params);
  }

  function getMediaWorkflows(params) {
    return mediaWorkflows.getMediaWorkflows(config, params);
  }

  function getOrganizations(params) {
    return organizations.getOrganizations(config, params);
  }

  function getPlaylists(params) {
    return playlists.getPlaylists(config, params);
  }

  return {
    init: init,
    getAppInfo: getAppInfo,
    getContent: getContent,
    getSharedContent: getSharedContent,
    getCurrentUser: getCurrentUser,
    getIdentityProviders: getIdentityProviders,
    getLibraries: getLibraries,
    getMediaWorkflows: getMediaWorkflows,
    getOrganizations: getOrganizations,
    getPlaylists: getPlaylists
  };

});
