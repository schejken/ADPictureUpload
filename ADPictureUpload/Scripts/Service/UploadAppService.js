'use strict';

periodavslutApp.factory('uploadAppService', function () {
    
    return {
        currentUserPic: function (myProfileProp) { 
            return GetUserProfileInfo(myProfileProp).done(function (data) {
                return data;
            });
        },
        currentUserName: function (currUserProp) {
            return GetUserProfileInfo(currUserProp).done(function (data) {
                return data;
            });
        },
        currentDisplayName: function (currDispProp){
            return GetUserProfileInfo(currDispProp).done(function(data){
                return data;
            });
        },
        sendPictoAD: function ($rootScope, $scope) {
            var dataUrl = $rootScope.wcfUrl + "UploadPictureToAd";
            return PostAjax(dataUrl, JSON.stringify({
                "request": {
                    "Thumbnail": { "User": $scope.accountName, "DisplayName": $scope.displayName }
                }
            })).done(function (data) { });
        },
        getWCFUrl: function (listName, listValue) {
            return GetListItem(listName, listValue).done(function (data) {
                return data;
            })
        },
        
        updateWCFUrl: function (data, listName, listTitle, listValue) {
            return updateListItem(data, listName, listTitle, listValue);
        }
    }
});