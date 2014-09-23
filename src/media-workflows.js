define(['lodash', 'facade/ajax'], function(_, ajax) {

  'use strict';

  function getMediaWorkflows(config, params) {

    var libraryId = (params && params.libraryId) ? 'ID=' + params.libraryId + '&' : '';
    var pageIndex = (params && params.pageIndex) ? 'PageIndex=' + params.pageIndex + '&' : '';
    var pageSize = (params && params.pageSize) ? 'PageSize=' + params.pageSize + '&' : '';
    var valueFilter = (params && params.valueFilter) ? 'FilterValue=' + encodeURIComponent(params.valueFilter) + '&' : '';

    var url = config.url + '/api/MediaWorkflows?' + libraryId + pageIndex + pageSize + valueFilter;

    return ajax.getJSON({
      url: url,
      user: config.user,
      password: config.password
    });
  }

  return {
    getMediaWorkflows: getMediaWorkflows
  };

});
