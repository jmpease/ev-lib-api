define(function(require) {

  var _ = require('lodash'),
      appInfo = require('app-info'),
      content = require('content'),
      currentUser = require('current-user'),
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

  function getCurrentUser() {
    return currentUser.getCurrentUser(config);
  }

  return {
    init: init,
    getAppInfo: getAppInfo,
    getContent: getContent,
    getCurrentUser: getCurrentUser
  };

});
