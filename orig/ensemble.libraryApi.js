(function (window, jQuery, _) {
    var auth = {};

    function init(config) {
        if (!config) {
            return console.warn("You need to provide config object");
        }

        _.extend(auth, config);
    };

    function getLibraries(params) {
        var pageIndex = (params && params.pageIndex) ? 'PageIndex=' + params.pageIndex + '&' : '';
        var pageSize = (params && params.pageSize) ? 'PageSize=' + params.pageSize + '&' : '';
        var onFilter = (params && params.onFilter) ? 'FilterOn=' + params.onFilter + '&' : '';
        var valueFilter = (params && params.valueFilter) ? 'FilterValue=' + encodeURIComponent(params.valueFilter) + '&' : '';

        var url = auth.url + '/Libraries?' + pageIndex + pageSize + onFilter + valueFilter;

        // Make the call to the server
        // to get a list of libraries
        var request = jQuery.ajax({
            type: "GET",
            url: url,
            dataType: 'json',
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic ' + jQuery.base64.encode(auth.user + ':' + auth.password));
            }
        });

        return request;
    };

    window.LibraryApi = {
        init: init,
        getLibraries: getLibraries
    };
})(window, jQuery, _);