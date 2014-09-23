(function (window, jQuery, _) {
    var auth = {};

    function init(config) {
        if (!config) {
            return console.warn("You need to provide config object");
        }

        _.extend(auth, config);
    };

    function getOrganizations(params) {
        var pageIndex = (params && params.pageIndex) ? 'PageIndex=' + params.pageIndex + '&' : '';
        var pageSize = (params && params.pageSize) ? 'PageSize=' + params.pageSize + '&' : '';
        var onFilter = (params && params.onFilter) ? 'FilterOn=' + params.onFilter + '&' : '';
        var valueFilter = (params && params.valueFilter) ? 'FilterValue=' + encodeURIComponent(params.valueFilter) + '&' : '';

        var url = auth.url + '/Organizations?' + pageIndex + pageSize + onFilter + valueFilter;

        // Make the call to the server
        // to get a list of organizations
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

    window.OrganizationApi = {
        init: init,
        getOrganizations: getOrganizations
    };
})(window, jQuery, _);

