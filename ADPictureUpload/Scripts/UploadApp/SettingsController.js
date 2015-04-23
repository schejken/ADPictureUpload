(function () {
    'use strict'
    var app = angular.module('templateApp');

    var startFunction = function ($scope, uploadAppService) {

        $scope.changeWCF = function () {
            var wcfUrl = $("#wcfInput").val();
            var listName = "ListConfig";
            var listTitle = "Value";
            var listValue = "Id";
            //var data = { "WCFUrl": wcfUrl }
            //UpdateListItem("ConfigList", data, 1);
            //$scope.newWCFUrl = $("#wcfInput").val();
            //var newWCFUrlen = $scope.newWCFUrl + "UploadPictureToAd";
            uploadAppService.updateWCFUrl(wcfUrl, listName, listTitle, listValue);
        };
    };
    app.controller("SettingsController", startFunction)
}());