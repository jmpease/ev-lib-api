(function (modEnsApi) {
    var config = {
        //user: 'hasp',
        //password: 'hasp',
        //url: 'https://cloud.ensemblevideo.com/api',
        user: 'admin',
        password: 'en%emble%45',
        url: 'http://ensembledev/api',
        //url: 'http://localhost:3150',
    };

    modEnsApi.init(config);

    var successCallback = function (collection) {
        var libraries = collection.Data;

        _.each(libraries, function (item) {
            var library = item;

            // Format the text to display
            var str = 'ID: ' + library.ID + ', Name: ' + library.Name + ', Organization: ' + library.OrganizationName;

            // Add a list item for the library.
            $('<li/>', { text: str }).appendTo($('#libraries'));
        });
    };

    var errorCallback = function (err) {
        console.warn("Error: ", err);
    };

    var params = {
        pageSize: 9999,
        pageIndex: 1
    };
    
    //ensApi.getLibraries(params).done(successCallback).fail(errorCallback);
    //ensApi.getOrganizations(params).done(successCallback).fail(errorCallback);
    //ensApi.getContents().done(successCallback).fail(errorCallback);
    //ensApi.getCurrentUser().done(successCallback).fail(errorCallback);
    //ensApi.getIdentityProviders().done(successCallback).fail(errorCallback);
    //ensApi.getAppInfo().done(successCallback).fail(errorCallback);
    //ensApi.getMediaWorkflows().done(successCallback).fail(errorCallback);
    //ensApi.getPlaylists().done(successCallback).fail(errorCallback);
    //ensApi.getSharedContent().done(successCallback).fail(errorCallback);

    modEnsApi.getLibraries(params).done(successCallback).fail(errorCallback);
    //modEnsApi.getOrganizations(params).done(successCallback).fail(errorCallback);
    //modEnsApi.getContents().done(successCallback).fail(errorCallback);
    //modEnsApi.getCurrentUser().done(successCallback).fail(errorCallback);
    //modEnsApi.getIdentityProviders().done(successCallback).fail(errorCallback);
    //modEnsApi.getAppInfo().done(successCallback).fail(errorCallback);
    //modEnsApi.getMediaWorkflows().done(successCallback).fail(errorCallback);
    //modEnsApi.getPlaylists().done(successCallback).fail(errorCallback);
    //modEnsApi.getSharedContent().done(successCallback).fail(errorCallback);


})(window.ModuleEnsembleApi);