/*global $,EV*/
(function() {

  $(document).ready(function() {

    EV.API.init({
      url: 'https://jmpease-pc:8082',
      user: 'admin',
      password: 'admin'
    });

    EV.API.getAppInfo().done(function(data) {
      $('body').append(JSON.stringify(data));
    });

  });

}());
