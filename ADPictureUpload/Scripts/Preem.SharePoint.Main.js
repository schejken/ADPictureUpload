'use strict';
var context = SP.ClientContext.get_current();
var web = context.get_web();
var user = context.get_web().get_currentUser();
var hostweburl;
var appweburl;
var digest = "";

var Preem = {};
Preem.Template = {};
Preem.Template.Application = {};

var periodavslutApp = angular.module('templateApp', ['ngRoute', 'ngGrid', 'ui.bootstrap', 'ngLocale', 'ngDialog']);

$(document).ready(function () {
    
    hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    
    if (appweburl.indexOf("#", 0) != -1) {
        appweburl = appweburl.substring(0, appweburl.indexOf("#", 0));
    }

    adminSettings();

    var scriptbase = hostweburl + "/_layouts/15/";

    // store the digest value for easy use later
    digest = $("#__REQUESTDIGEST").val();

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }

    // Set link to UnitTest page.
    var urlParameters = document.URL.split("?")[1];
    $('#UnitTests').append('<li><a href="UnitTests.aspx?' + urlParameters + '">Unit Tests</a></li>');
});

function adminSettings() {
    var def = $.Deferred();
    context.load(user);

    context.executeClientRequestAsync(function onGetUserNameSuccess() {
        if (user.get_isSiteAdmin()) {
            $("#adminSetting").show();
        }
        else {
            $("#adminSetting").hide();
        }
        def.resolve();
    },
        function onGetUserNameFail(sender, args) {
            alert("Failed to get the username. Error: " + args.get_message());
        });
    return def.promise();
}

// Function to retrieve a query string value.
// For production purposes you may want to use
// a library to handle the query string.
function getQueryStringParameter(paramToRetrieve) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}

function SetTitleText(navtext) {
    $("#titleText").text(navtext);
}

// This will setup the routing for Angular. Each route points to a view template that has it's own controller defined.
periodavslutApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/UploadPicture', {
            templateUrl: '../ViewTemplates/UploadPicture.html',
            controller: 'UploadAppController'
        }).
        when('/Settings', {
            templateUrl: '../ViewTemplates/Settings.html',
            controller: 'SettingsController'
        })
        .otherwise({ redirectTo: "/UploadPicture" })

  }]);