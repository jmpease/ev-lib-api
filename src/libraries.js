define(['lodash', 'facade/ajax'], function(_, ajax) {

  'use strict';

  function getLibraries(config, params) {
    var pageIndex = (params && params.pageIndex) ? 'PageIndex=' + params.pageIndex + '&' : '';
    var pageSize = (params && params.pageSize) ? 'PageSize=' + params.pageSize + '&' : '';
    var onFilter = (params && params.onFilter) ? 'FilterOn=' + params.onFilter + '&' : '';
    var valueFilter = (params && params.valueFilter) ? 'FilterValue=' + encodeURIComponent(params.valueFilter) + '&' : '';

    var url = config.url + '/api/Libraries?' + pageIndex + pageSize + onFilter + valueFilter;

    return ajax.getJSON({
      url: url,
      user: config.user,
      password: config.password
    });
  }

  return {
    getLibraries: getLibraries
  };

});
