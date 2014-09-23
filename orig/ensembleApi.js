(function (window, jQuery, _, orgApi) {
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

    function getOrganizations(params) {

        orgApi.init(auth);
        return orgApi.getOrganizations(params);
    }

    function getContents(params) {
        
        var libraryId = (params && params.libraryId) ? 'ID=' + params.libraryId + '&' : '';
        var pageIndex = (params && params.pageIndex) ? 'PageIndex=' + params.pageIndex + '&' : '';
        var pageSize = (params && params.pageSize) ? 'PageSize=' + params.pageSize + '&' : '';
        var valueFilter = (params && params.valueFilter) ? 'FilterValue=' + encodeURIComponent(params.valueFilter) + '&' : '';

        var url = auth.url + '/Content?' + libraryId + pageIndex + pageSize + valueFilter;

        // Make the call to the server
        // to get a list of contents
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

    function getCurrentUser() {
        
        var url = auth.url + '/CurrentUser/CurrentUser';

        // Make the call to the server
        // to get an info of current user
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

    function getIdentityProviders() {

        var url = auth.url + '/IdentityProviders';

        // Make the call to the server
        // to get a listo of Identity Providers
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

    function getAppInfo() {

        var url = auth.url + '/Info';

        // Make the call to the server
        // to get an info of Application Info
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

    function getMediaWorkflows(params) {

        var libraryId = (params && params.libraryId) ? 'ID=' + params.libraryId + '&' : '';
        var pageIndex = (params && params.pageIndex) ? 'PageIndex=' + params.pageIndex + '&' : '';
        var pageSize = (params && params.pageSize) ? 'PageSize=' + params.pageSize + '&' : '';
        var valueFilter = (params && params.valueFilter) ? 'FilterValue=' + encodeURIComponent(params.valueFilter) + '&' : '';

        var url = auth.url + '/MediaWorkflows?' + libraryId + pageIndex + pageSize + valueFilter;

        // Make the call to the server
        // to get a list of Media Workflows
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

    function getPlaylists(params) {

        var libraryId = (params && params.libraryId) ? 'ID=' + params.libraryId + '&' : '';
        var pageIndex = (params && params.pageIndex) ? 'PageIndex=' + params.pageIndex + '&' : '';
        var pageSize = (params && params.pageSize) ? 'PageSize=' + params.pageSize + '&' : '';
        var valueFilter = (params && params.valueFilter) ? 'FilterValue=' + encodeURIComponent(params.valueFilter) + '&' : '';

        var url = auth.url + '/PlayLists?' + libraryId + pageIndex + pageSize + valueFilter;

        // Make the call to the server
        // to get a list of PlayLists
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

    window.EnsembleApi = {
        init: init,
        getLibraries: getLibraries,
        getOrganizations: getOrganizations,
        getContents: getContents,
        getCurrentUser: getCurrentUser,
        getIdentityProviders: getIdentityProviders,
        getAppInfo: getAppInfo,
        getMediaWorkflows: getMediaWorkflows,
        getPlaylists: getPlaylists,
        getSharedContent: getSharedContent
    };
})(window, jQuery, _, OrganizationApi);

