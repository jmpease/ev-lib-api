(function (window, jQuery, _) {
    var auth = {};

    function init(config) {
        if (!config) {
            return console.warn("You need to provide config object");
        }

        _.extend(auth, config);
    };

    function getSharedContent(params) {

        var libraryId = (params && params.libraryId) ? 'ID=' + params.libraryId + '&' : '';
        var pageIndex = (params && params.pageIndex) ? 'PageIndex=' + params.pageIndex + '&' : '';
        var pageSize = (params && params.pageSize) ? 'PageSize=' + params.pageSize + '&' : '';
        var valueFilter = (params && params.valueFilter) ? 'FilterValue=' + encodeURIComponent(params.valueFilter) + '&' : '';

        var url = auth.url + '/SharedContent?' + libraryId + pageIndex + pageSize + valueFilter;

        // Make the call to the server
        // to get a list of Shared Contents
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
    }

    window.SharedContentApi = {
        init: init,
        getSharedContent: getSharedContent
    };
})(window, jQuery, _);