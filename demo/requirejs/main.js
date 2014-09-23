define(['jquery', 'api'], function($, api) {

  api.init({
    url: 'https://jmpease-pc:8082/api',
    user: 'admin',
    password: 'admin'
  });

  api.getAppInfo().done(function(data) {
    $('body').append(JSON.stringify(data));
  });

});
