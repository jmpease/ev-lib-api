(function (window, jQuery, _) {
    var auth = {};

    function init(config) {
        if (!config) {
            return console.warn("You need to provide config object");
        }

        _.extend(auth, config);
    };

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

    window.IdentityProviderApi = {
        init: init,
        getIdentityProviders: getIdentityProviders
    };
})(window, jQuery, _);