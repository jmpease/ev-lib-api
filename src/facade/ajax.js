// base64 is a polyfill for window.btoa and window.atob
define(['jquery', 'base64'], function($) {

  'use strict';

  // TODO - consider facade for deferred returned by $.ajax call

  function getJSON(params) {
    return $.ajax({
      type: 'GET',
      url: params.url,
      dataType: 'json',
      crossDomain: true,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(params.user + ':' + params.password));
      }
    });
  }

  return {
    getJSON: getJSON
  };

});
