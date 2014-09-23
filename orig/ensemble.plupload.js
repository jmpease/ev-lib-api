(function (window, jQuery) {
    /**********************************************
    * Ensemble Uploader
    * Plugin Name: ensembleUploader
    * Author: Nedim Deliahmetovic
    **********************************************/
    jQuery.fn.ensembleUploader = function (serverVars, dropBoxConfig) {

        // ND: Moved on side who is calling this function
        //var selectors = {
        //    generateImages: '.generateImages input',
        //    deleteImages: '.deletedAllPreviousImages input',
        //    mediaWorkflowID: '.uploadSourcesList'
        //};

        var evSettings = {
            // bytes -> kbytes -> mbytes
            maxUploadLimit: serverVars.sizeLimit + 'gb',
            chunkSize: serverVars.chunkSize,// *ND: This should be configured '2mb',
            selectMultiple: serverVars.allowMultipleFileUpload,
            contentID: serverVars.contentID,
            userID: serverVars.userID,
            libraryID: serverVars.libraryID,
            assetTypeID: serverVars.assetTypeID,
            uploadHandler: serverVars.uploadHandler,// ND: serverVars.appRoot + '/unprotected/Uploads.ashx',
            flashPath: serverVars.flashPath,//ND: serverVars.appRoot + '/js/plupload/plupload.flash.swf',
            silverlightPath: serverVars.silverlightPath,// ND: serverVars.appRoot + '/js/plupload/plupload.silverlight.xap',
            filterTitle: serverVars.supportedFileDesc,
            filterExtensions: serverVars.supportedFileExtension.replace(/;/g, ',').replace(/\*./g, ''),
            debug: false,
            mediaWorkflowID: serverVars.mediaWorkflowID,
            generateImages: serverVars.generateImages,
            deleteImages: serverVars.deleteImages,
            preventRefreshPage: serverVars.preventRefreshPage
        };

        // Configuration for DropBox
        var dropBoxSettings = {
            dropboxName : dropBoxConfig.dropboxName,
            libraryID : dropBoxConfig.libraryID,
            mediaWorkflowID : dropBoxConfig.mediaWorkflowID,
            assetTypeID : dropBoxConfig.assetTypeID,
            firstName : dropBoxConfig.firstName,
            lastName : dropBoxConfig.lastName,
            email : dropBoxConfig.email,
            title : dropBoxConfig.title,
            description : dropBoxConfig.description,
            dateProduced : dropBoxConfig.dateProduced,
            keywords : dropBoxConfig.Keywords
        }

        return this.each(function () {
            // for inner scope
            //var $this = jQuery(this); // ND: Never used

            // create object to hold all element ID's, classes, etc.
            var elements = {
                debugInfo: '#debugInfo',
                statusMessage: '#statusMessage',
                fileList: '#fileList',
                cancelButton: 'uploader_cancel', // no # because it is used for creation as well as manipulation
                cancelButtonClasses: 'plupload_button plupload_cancel',
                queueFooter: '.plupload_filelist_footer',
                browseButton: '#uploader_browse',
                dropArea: '.plupload_droptext',
                iPadProgressBar: 'iPadProgress',
                contentGrid: '.contentGrid'
            };

            // messages and strings for the uploader
            var messages = {
                addButtonText: 'Add file' + ((evSettings.selectMultiple) ? 's' : ''),
                cancelButtonText: 'Cancel Upload',
                dragDropText: 'Drag file' + ((evSettings.selectMultiple) ? 's' : '') + ' here.',
                selectAFile: 'You must select at least one file.',
                uploadSuccess: '<div class="uploadSuccess">File' + ((evSettings.selectMultiple) ? 's' : '') + ' uploaded successfully!</div>',
                uploadUnsuccessful: '<div class="uploadError">File' + ((evSettings.selectMultiple) ? 's' : '') + ' uploaded unsuccessfully!</div>',
                fileNotSupported: '<div class="uploadError">The file you selected is not supported: <strong>${FileName}</strong></div>',
                maxUploadLimit: '<div class="uploadError">You have exceeded the maximum upload limit of <strong>${MaxUploadLimit}</strong></div>',
                debugTemplate: 'Runtimes: ${Runtimes}<br />User Agent: ${UserAgent}<br />iOS: ${iOS}<br />IE: ${MSIE}<br />Safari v5: ${Safari}<br />Android: ${Android}<br />Multipart: ${Multipart}<br />Handler Path: ${HandlerUrl}<br />Flash: ${FlashPath}<br />Silverlight: ${SilverlightPath}<br />Max Upload Limit: ${MaxUploadLimit}<br />Supported Files: ${FilterExtensions}',
                confirmReplace: 'WARNING: You have chosen another file to upload and only one is permitted. Do you want this video to replace the other one in the queue?'
            };

            // browser detection
            var iOS = (navigator.userAgent.indexOf('iPad') > -1) || (navigator.userAgent.indexOf('iPhone') > -1);
            var MSIE = (navigator.userAgent.indexOf('MSIE') > -1);
            var SafariVersion5 = (navigator.userAgent.match(/Version\/5.*Safari/i) != null) && (navigator.userAgent.indexOf('Chrome') == -1)
                && (navigator.userAgent.indexOf('iPad') == -1) && (navigator.userAgent.indexOf('iPhone') == -1)
                && (navigator.userAgent.indexOf('Android') == -1);
            var Android = (navigator.userAgent.indexOf('Android') > -1);
            var theRuntimes;
            //var chunkSize = evSettings.chunkSize; ND: No need to create new variable.
            var isMultipart = true;
            var cancelButton = jQuery('#' + elements.cancelButton);
            //var iPadProgressBar = jQuery('#' + elements.iPadProgressBar);

            // runtime selection based on browser
            if (iOS) { theRuntimes = 'html5, html4'; }
            else if (MSIE) { theRuntimes = 'silverlight,html5,flash'; }
            else if (Android) { theRuntimes = 'flash,html5,html4'; }
            else { theRuntimes = 'html5,html4'; }

            var selectMultiple = (iOS) ? false : evSettings.selectMultiple;

            // create the uploader instance with custom/dynamic options
            jQuery(this).pluploadQueue({
                runtimes: theRuntimes,
                url: evSettings.uploadHandler,
                max_file_size: evSettings.maxUploadLimit,
                chunk_size: evSettings.chunkSize,
                // for flash
                // urlstream_upload: false,
                // creates unique names for files
                unique_names: false,
                // lets user upload again after first queue is completed
                multiple_queues: true,
                multi_selection: selectMultiple,
                // allows drag and drop for files when browsers allow it
                dragdrop: true,
                // multipart encodings for runtimes that support it - says safari doesnt,
                // but it seems to work the best with it set to true
                multipart: isMultipart,
                multipart_params: {},

                // Flash shim
                flash_swf_url: evSettings.flashPath,

                // Silverlight shim
                silverlight_xap_url: evSettings.silverlightPath,

                init: {
                    StateChanged: function (up) {
                        switch (up.state) {
                            case plupload.STARTED:
                                // clear status
                                jQuery(elements.statusMessage).empty();

                                // if no cancel button, create one
                                if (cancelButton.length == 0) {
                                    // create cancel button
                                    cancelButton = jQuery(document.createElement('a'))
                                    .text(messages.cancelButtonText)
                                    .attr({
                                        'id': elements.cancelButton,
                                        'class': elements.cancelButtonClasses,
                                        'href': 'javascript:void(0);'
                                    })
                                    .click(function (event) {
                                        up.stop();
                                        location.reload();
                                    });

                                    // add cancel button to footer
                                    jQuery(elements.queueFooter).append(cancelButton);
                                }
                                else {
                                    cancelButton.show();
                                }

                                break;
                            case plupload.STOPPED:
                                break;
                        };
                    },
                    BeforeUpload: function (up, file) {
                        var postData = {};
                        var fileSize = "0";
                        //Fix for HTML4 uploader (IE9 without flash)
                        if (file.size != null) {
                            // this is to fix uploading in iOS 7. Silverlight and other browsers need or use toString properly
                            fileSize = (iOS) ? file.size : file.size.toString();
                        }

                        if (dropBoxConfig != null) {
                            var pageValidated = Page_ClientValidate();

                            if (pageValidated) {
                                up.trigger("DisableBrowse", true);

                                postData.FileName = file.name;
                                postData.FileSize = fileSize;
                                postData.DropboxName = dropBoxSettings.dropboxName; // jQuery('.DropboxName').val();
                                postData.LibraryID = dropBoxSettings.libraryID; //  jQuery('.LibraryID').val();
                                postData.MediaWorkflowID = dropBoxSettings.mediaWorkflowID; // jQuery('.MediaWorkflowID').val();
                                postData.AssetTypeID = dropBoxSettings.assetTypeID; // jQuery('.AssetTypeID').val();
                                postData.FirstName = dropBoxSettings.firstName; // jQuery('.FirstName').val();
                                postData.LastName = dropBoxSettings.lastName; // jQuery('.LastName').val();
                                postData.Email = dropBoxSettings.email; // jQuery('.Email').val();
                                postData.Title = dropBoxSettings.title; // jQuery('.Title').val();
                                postData.Description = dropBoxSettings.description; // jQuery('.Description').val();
                                postData.DateProduced = dropBoxSettings.dateProduced; // jQuery('.DateProduced').val();
                                postData.Keywords = dropBoxSettings.keywords; // jQuery('.Keywords').val();

                                up.settings.multipart_params = postData;
                            } else {
                                // Form validation failed

                                // Stop the upload
                                up.stop();

                                // Hide the status and show the buttons
                                jQuery(".plupload_upload_status").hide();
                                jQuery(".plupload_buttons").show();
                                cancelButton.hide();

                                return false;
                            }
                        } else {
                            up.trigger("DisableBrowse", true);

                            // ND: Moved to caller side
                            //var mediaWorkflowID = (jQuery(selectors.mediaWorkflowID).length > 0) ? jQuery(selectors.mediaWorkflowID).val() : '';
                            //var generateImages = (jQuery(selectors.generateImages).length > 0) ? jQuery(selectors.generateImages).is(':checked') : true;
                            //var deleteImages = (jQuery(selectors.deleteImages).length > 0) ? jQuery(selectors.deleteImages).is(':checked') : false;

                            postData.FileName = file.name;
                            postData.FileSize = fileSize;
                            postData.MediaWorkflowID = evSettings.mediaWorkflowID; // ND: taken from evsettings mediaWorkflowID
                            postData.GenerateImages = evSettings.generateImages; // ND: taken from evsettings generateImages
                            postData.DeleteAllPreviousImages = evSettings.deleteImages; // ND: taken from evsettings deleteImages
                            postData.LibraryID = evSettings.libraryID;
                            postData.UserID = evSettings.userID;
                            postData.ContentID = evSettings.contentID;
                            postData.AssetTypeID = evSettings.assetTypeID;

                            up.settings.multipart_params = postData;
                        }

                        // gets around Safari 5 and HTML 5 not chunking
                        if (SafariVersion5 && up.runtime == 'html5') {
                            uploader.settings.url = uploader.settings.url + '?Chunk=0&Chunks=1';
                        }
                    },
                    UploadComplete: function (up, files) {
                        cancelButton.hide();
                        var invalidUpload = jQuery.grep(files, function (element, index) {
                            return element.status == plupload.FAILED;
                        });

                        if (invalidUpload.length > 0) {
                            jQuery(elements.statusMessage).append(messages.uploadUnsuccessful);
                            return;
                        }

                        if (dropBoxConfig != null) {
                            location.href = location.href + '?Action=Done';
                        } else {
                            location.reload();
                        }
                    },
                    Error: function (up, err) {
                        switch (err.code) {
                            case plupload.FILE_SIZE_ERROR:
                                var errParams = { MaxUploadLimit: evSettings.maxUploadLimit };
                                jQuery(elements.statusMessage).empty();
                                jQuery.tmpl(messages.maxUploadLimit, errParams).appendTo(elements.statusMessage);
                                break;
                        };
                        up.trigger("DisableBrowse", false);
                        // Reposition Flash/Silverlight
                        up.refresh();
                    },
                    FilesAdded: function (up, files) {

                        // clear status
                        jQuery(elements.statusMessage).empty();

                        // check file extensions here
                        files.each(function (f) {
                            var validExtensions = evSettings.filterExtensions;
                            var errCount = 0;

                            validExtensions = validExtensions.substring(0, validExtensions.length - 1).split(',');

                            // go through valid extenstions and test against current file extension
                            for (var i = 0; i < validExtensions.length; i++) {
                                var extension = f.name.split(".");
                                extension = extension[extension.length - 1];

                                // if no match, increase error count
                                if (extension.toUpperCase() !== validExtensions[i].toUpperCase()) { errCount++; }
                            }

                            // if there as many errors as valid extensions, it did not pass! Show error and remove from queue
                            if (errCount == validExtensions.length) {
                                var errParams = { FileName: f.name };

                                jQuery.tmpl(messages.fileNotSupported, errParams).appendTo(elements.statusMessage);
                                up.removeFile(f);
                            }
                        });

                        // check selectMultiple, if false, then check queue. If one, then display message about replacing file
                        if (!evSettings.selectMultiple && up.files.length > 1) {
                            var replace = confirm(messages.confirmReplace);
                            (replace) ? up.removeFile(uploader.files[0]) : up.removeFile(files[0]);
                        }
                    },
                    Destroy: function (up) {
                        // clear status
                        jQuery(elements.statusMessage).empty();
                    }
                }
            });

            // adjust browse button label based on selection mode *ND: commented because we need always to handle button text
            //if (!evSettings.selectMultiple) {
            //    jQuery(elements.browseButton).text(messages.addButtonText);
            //    jQuery(elements.dropArea).text(messages.dragDropText);
            //}
            
            jQuery(elements.browseButton).text(messages.addButtonText);
            jQuery(elements.dropArea).text(messages.dragDropText);
            

            // instantiate uploader object for binding to events and API
            var uploader = jQuery(this).pluploadQueue();

            // Client side form validation
            jQuery('form').submit(function (e) {
                // Files in queue upload them first
                if (uploader.files.length > 0) {
                    // When all files are uploaded submit form
                    if (uploader.files.length === (uploader.total.uploaded + uploader.total.failed)) {
                        jQuery('form')[0].submit();
                    }

                    uploader.start();
                } else {
                    var contentGrid = jQuery(elements.contentGrid);
                    if (contentGrid.length > 0 && contentGrid[0].rows.length > 1)
                        return true;

                    jQuery(elements.statusMessage).empty().append(messages.selectAFile);
                }

                return false;
            });

            // Debug Info
            if (evSettings.debug && jQuery(elements.debugInfo).length > 0) {
                var params = {
                    Runtimes: theRuntimes,
                    UserAgent: navigator.userAgent,
                    iOS: iOS,
                    MSIE: MSIE,
                    Safari: SafariVersion5,
                    Android: Android,
                    Multipart: isMultipart,
                    HandlerUrl: evSettings.uploadHandler,
                    FlashPath: evSettings.flashPath,
                    SilverlightPath: evSettings.silverlightPath,
                    MaxUploadLimit: evSettings.maxUploadLimit,
                    FilterExtensions: evSettings.filterExtensions
                };

                jQuery(elements.debugInfo).empty();
                jQuery.tmpl(messages.debugTemplate, params).appendTo(elements.debugInfo);
            }
            else {
                jQuery(elements.debugInfo).hide();
            }
        });
    };

    window.EnsemblePlUploader = {
        ensemblePlUploader: ensemblePlUploader
    };
})(windows, jQuery);