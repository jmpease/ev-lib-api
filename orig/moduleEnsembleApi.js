(function (window, jQuery, _, appInfo, contApi, currentUserApi, identProvApi, libApi, mediaWorkApi, orgApi, playListApi, sharedContApi) {
    var auth = {};

    function init(config) {
        if (!config) {
            return console.warn("You need to provide config object");
        }

        _.extend(auth, config);
    };

    // Get libraries
    function getLibraries(params) {

        libApi.init(auth);
        return libApi.getLibraries(params);
    };

    // Get organizations
    function getOrganizations(params) {

        orgApi.init(auth);
        return orgApi.getOrganizations(params);
    }

    // Get contents
    function getContents(params) {

        contApi.init(auth);
        return contApi.getContents(params);
    }

    // Get current user
    function getCurrentUser() {

        currentUserApi.init(auth);
        return currentUserApi.getCurrentUser();
    }

    // Get identity providers
    function getIdentityProviders() {

        identProvApi.init(auth);
        return identProvApi.getIdentityProviders();
    }

    // Get application info
    function getAppInfo() {

        appInfo.init(auth);
        return appInfo.getAppInfo();
    }

    // Get mediaworkflows
    function getMediaWorkflows(params) {

        mediaWorkApi.init(auth);
        return mediaWorkApi.getMediaWorkflows(params);
    }

    // Get playlists
    function getPlaylists(params) {

        playListApi.init(auth);
        return playListApi.getPlaylists(params);
    }

    // Get shared content
    function getSharedContent(params) {

        sharedContApi.init(auth);
        return sharedContApi.getSharedContent(params);
    }

    window.ModuleEnsembleApi = {
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
})(window, jQuery, _, AppInfoApi, ContentApi, CurrentUserApi, IdentityProviderApi,
    LibraryApi, MediaWorkflowApi, OrganizationApi, PlaylistApi, SharedContentApi);

