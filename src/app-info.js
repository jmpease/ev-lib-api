define(['lodash', 'facade/ajax'], function(_, ajax) {

  'use strict';

  function getAppInfo(config) {
    // Make the call to the server
    // to get an info of Application Info
    return ajax.getJSON({
      url: config.url + '/Info',
      user: config.user,
      password: config.password
    });
  }

  return {
    getAppInfo: getAppInfo
  };

});
