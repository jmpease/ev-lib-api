define(['lodash', 'facade/ajax'], function(_, ajax) {

  'use strict';

  function getCurrentUser(config) {

    var url = config.url + '/CurrentUser/CurrentUser';

    return ajax.getJSON({
      url: url,
      user: config.user,
      password: config.password
    });
  }

  return {
    getCurrentUser: getCurrentUser
  };

});
