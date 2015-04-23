var response;
var context = SP.ClientContext.get_current();
var fullName = {
    fullName: ""
};

//function GetAjax(url, data) {
//    var dfd = $.Deferred(function () {
//        url = "http://localhost:7020/TemplateService.svc/web/" + url;
//        var context = SP.ClientContext.get_current();
//        var request = new SP.WebRequestInfo();
//        request.set_url(url);
//        request.set_method("GET");

//        if (data != null) {
//            request.set_body(JSON.stringify({ "request": data }));
//        }

//        response = SP.WebProxy.invoke(context, request);

//        context.executeQueryAsync(function () {
//            dfd.resolve(JSON.parse(response.get_body()));
//        }, function () {
//            dfd.reject(response.get_body());
//        });
//    });
//    return dfd.promise();
//}

function PostAjax(urlen, data) {
    var dfd = $.Deferred(function () {

        url = urlen;
        var request = new SP.WebRequestInfo();
        request.set_headers({ "Accept": "application/json;odata=verbose", "content-type": "application/json;odata=verbose" });
        request.set_url(url);
        request.set_method("POST");
        request.set_body(data);
        
        response = SP.WebProxy.invoke(context, request);

        context.executeQueryAsync(function () {
            dfd.resolve(JSON.parse(response.get_body()));
        }, function () {
            dfd.reject(response.get_body());
        });
    });
    return dfd.promise();
}

function GetUserProfileInfo(myProperties) {

    var deferred = $.Deferred();
    var executor = new SP.RequestExecutor(appweburl);

    var query = getAppODataApiUrl() + "/SP.UserProfiles.PeopleManager/GetMyProperties/" + myProperties;

    executor.executeAsync({
        url: query,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            deferred.resolve(JSON.parse(data.body));
        },
        error: function (data, errorCode, errorMessage) {
            deferred.reject('Failed to get host site. Error:' + errorMessage);
        }
    });
    return deferred;
}

function GetListItem(query, listValue) {

    var deferred = $.Deferred();
    var theQuery = getAppODataApiUrl() + "/web/lists/getbytitle('" + query + "')/items?$select="+ listValue +"";

    $.ajax({
        url: theQuery,
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: onGetEntriesSuccess,
        error: onoDataCallFailure
    });

    function onGetEntriesSuccess(data) {
        deferred.resolve(data.d);
    }

    function onoDataCallFailure(data, errorCode, errorMessage) {
        deferred.reject('Error:' + errorMessage);
    }

    return deferred;
}

function updateListItem(data, listName, listTitle, listValue) {
    
    var oList = context.get_web().get_lists().getByTitle(listName);
    GetListItem(listName, listValue).done(function (response) {
        //console.log(response.results[0].ID);
        var theItemId = response.results[0].ID;
        var oListItem = oList.getItemById(theItemId);
        oListItem.set_item(listTitle, data);
        oListItem.update();

        context.executeQueryAsync(
        Function.createDelegate(this, onQuerySucceeded),
        Function.createDelegate(this, onQueryFailed)
        );
        function onQuerySucceeded() {
            console.log("Item has been updated");
        }

        function onQueryFailed(sender, args) {
            console.log('Request failed. ' + args.get_message() +
                '\n' + args.get_stackTrace());
        }
    });
}




function getAppAbsoluteUrl() {

    return _spPageContextInfo.webAbsoluteUrl;
};

function getAppRelativeUrl() {

    return _spPageContextInfo.webServerRelativeUrl;
};

function getAppODataApiUrl() {

    return getAppAbsoluteUrl() + "/_api";
};