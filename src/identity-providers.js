define(['lodash', 'facade/ajax'], function(_, ajax) {

  'use strict';

  function getIdentityProviders(config) {

    var url = config.url + '/api/IdentityProviders';

    return ajax.getJSON({
      url: url,
      user: config.user,
      password: config.password
    });
  }

  return {
    getIdentityProviders: getIdentityProviders
  };

});
