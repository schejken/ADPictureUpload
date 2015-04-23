(function () {
    'use strict'
    var app = angular.module('templateApp');

    var firstFunction = function ($scope, $rootScope, ngDialog, uploadAppService) {

        //Get the WCF url and set the scope variable
        //var query = "http://apps-8c0a464880f536.preemappstest.se/sites/Developer/ADPictureUpload/_api/web/lists/getbytitle('ListConfig')/items(1)";
        var listName = "ListConfig";
        var listValue = "Value";
        uploadAppService.getWCFUrl(listName, listValue).done(function (response) {
            //console.log(response);
            var object = response.results[0].Value;
            $rootScope.wcfUrl = object;
        });

        //Get the current users profile picture, in large thumbnail
        uploadAppService.currentUserPic("PictureUrl").done(function (response) {
            var url = response.d.PictureUrl;
            var theObject = response.d.PictureUrl.replace('MThumb', 'LThumb');
            var wcfPicUrl = url.substring(0, url.lastIndexOf('?'));

            //The small thumbnail
            $scope.wcfPicUrl = wcfPicUrl;
            //The large thumbnail
            $scope.imageUrl = theObject;
            $scope.$apply();
        });

        //Get current user accountname
        uploadAppService.currentUserName("AccountName").done(function (response) {
            var str = response.d.AccountName;
            var returnObject = str.substring(str.indexOf("\\") + 1);
            
            $scope.accountName = returnObject;
            $scope.$apply();
        });

        //Get current user displayname
        uploadAppService.currentDisplayName("DisplayName").done(function (response) {
            var returnObj = response.d.DisplayName;
            $scope.displayName = returnObj;
            $scope.$apply();
        });

        // for checkbox use
        $scope.buttonDisabled = true;

        //ngDialog for upload success
        $scope.ngDialogClick = function () {
            ngDialog.open({
                template: "../Dialogs/UploadPicDialog.html",
                scope: $scope,
                controller: "UploadAppController",
                className: "ngdialog-theme-default"
            })
        };

        //TODO: Refactor to angular Service.
        //Start upload file function
        $scope.UploadFile = function () {
            // get the library name and file reference
            var docLibrary = "Profilbilder";
            var fileInput = $('#fileSelectorInput');
            var fileTemp = document.querySelector('input[type=file]').files[0];
            var previewPicDiv = $("#previewPic");

            // if there is no document library name alert the user and return
            if (!docLibrary || docLibrary == '') {
                alert("Det angivna dokumentbiblioteket finns inte.");
                return;
            }

            // if we couldnt get a reference to the file input then alert the user and return
            if (!fileInput || fileInput.length != 1) {
                alert('Fel i input.');
                return;
            }
            else if (!fileInput[0].files) {
                alert("Din webbläsare kan inte ladda upp filer.");
                return;
            }
            else if (fileInput[0].files.length <= 0) {
                alert("Du har inte valt en fil, var god och välj en fil att ladda upp.");
                return;
            }

            //If more then one file. For each file in the list of files process the upload
            //for (var i = 0; i < fileInput[0].files.length; i++) {
            //    var file = fileInput[0].files[i];
            //    console.log(file);
            //    ProcessUpload(file, docLibrary, '');
            //}

            //If only one file.
            var file = fileInput[0].files[0];

            var userName = $("#theName").text();

            handleFiles(userName, file, docLibrary);

        }
        function ProcessUpload(newFileName, fileInput, docLibraryName, folderName) {
            var reader = new FileReader();

            reader.onload = function (result) {
                var fileName = '',
                 libraryName = '',
                 fileData = '';

                var byteArray = new Uint8Array(result.target.result);
                for (var i = 0; i < byteArray.byteLength; i++) {
                    fileData += String.fromCharCode(byteArray[i])
                };
                // Perform upload
                PerformUpload(docLibraryName, newFileName, folderName, fileData);
            };
            reader.readAsArrayBuffer(fileInput);
        }
        function PerformUpload(libraryName, fileName, folderName, fileData) {
            var url;
            //debugger;

            //url = appweburl + "/_api/SP.AppContextSite(@target)/web/GetFolderByServerRelativeUrl('" + libraryName + "')/files/add(url='" + fileName + "',overwrite=true)?@target='" + hostweburl + "'";

            // if there is no folder name then just upload to the root folder
            if (folderName == "") {
                url = appweburl + "/_api/SP.AppContextSite(@TargetSite)/web/lists/getByTitle(@TargetLibrary)/RootFolder/Files/add(url=@TargetFileName,overwrite='true')?" +
                    "@TargetSite='" + hostweburl + "'" +
                    "&@TargetLibrary='" + libraryName + "'" +
                    "&@TargetFileName='" + fileName + ".jpg" + "'";
            }
            else {
                // if there is a folder name then upload into this folder
                url = appweburl + "/_api/SP.AppContextSite(@TargetSite)/web/lists/getByTitle(@TargetLibrary)/RootFolder/folders(@TargetFolderName)/files/add(url=@TargetFileName,overwrite='true')?" +
                   "@TargetSite='" + hostweburl + "'" +
                   "&@TargetLibrary='" + libraryName + "'" +
                   "&@TargetFolderName='" + folderName + "'" +
                   "&@TargetFileName='" + fileName + ".jpg" + "'";
            }

            // use the request executor to perform the upload
            var reqExecutor = new SP.RequestExecutor(appweburl);
            reqExecutor.executeAsync({
                url: url,
                method: "POST",
                headers: {
                    "Accept": "application/json; odata=verbose",
                    //"X-RequestDigest": digest
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                contentType: "application/json;odata=verbose",
                binaryStringRequestBody: true,
                body: fileData,
                success: function (x, y, z) {
                    //alert("Success! Din profilbild har laddads upp till SharePoint.");
                    $scope.ngDialogClick();
                    //WCF call here
                    uploadAppService.sendPictoAD($rootScope, $scope).then(function (data, status, headers, config) {
                        //console.log("Done: " + data);
                    })
                },
                error: function (x, y, z) {
                    alert("Någonting gick fel under uppladdningen.");
                }
            });
        }

        // Creates a resized image for preview.
        function handleFiles(userName, file, docLibrary) {
            // Create an image
            var img = document.createElement("img");
            // Create a file reader
            var reader = new FileReader();
            // Set the image once loaded into file reader
            reader.onload = function (e) {
                img.src = e.target.result;

                var canvas = document.createElement("canvas");
                //var canvas = $("<canvas>", {"id":"testing"})[0];
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var MAX_WIDTH = 200;
                var MAX_HEIGHT = 200;
                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                var dataurl = canvas.toDataURL("image/png");
                $scope.previewPicDialog = dataurl;

                var theBlob = dataURItoBlob(dataurl);

                ProcessUpload(userName, theBlob, docLibrary, '');

            }
            // Load files into file reader
            reader.readAsDataURL(file);
        }
        function dataURItoBlob(dataURI) {
            if (typeof dataURI !== 'string') {
                throw new Error('Invalid argument: dataURI must be a string');
            }
            dataURI = dataURI.split(',');
            var type = dataURI[0].split(':')[1].split(';')[0],
                byteString = atob(dataURI[1]),
                byteStringLength = byteString.length,
                arrayBuffer = new ArrayBuffer(byteStringLength),
                intArray = new Uint8Array(arrayBuffer);
            for (var i = 0; i < byteStringLength; i++) {
                intArray[i] = byteString.charCodeAt(i);
            }
            return new Blob([intArray], {
                type: type
            });
        };
    };
    app.controller("UploadAppController", firstFunction);
    }());