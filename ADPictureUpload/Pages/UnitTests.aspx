<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/JQuery/jquery-1.8.2.min.js"></script>
    <script src="../Scripts/Other/hashtable.js"></script>
    <script type="text/javascript" src="../Scripts/JQuery/jquery.inputmask.bundle.min.js"></script>
    <script type="text/javascript" src="../Scripts/JQuery/jquery.numberformatter-1.2.4.jsmin.js"></script>

    <script type="text/javascript" src="../Scripts/Angular/angular.min.js"></script>
    <script type="text/javascript" src="../Scripts/Angular/angular-route.js"></script>
    <script type="text/javascript" src="../Scripts/Angular/angular-locale_sv.js"></script>
    <script type="text/javascript" src="../Scripts/Angular/ng-grid-2.0.7.min.js"></script>
    <script type="text/javascript" src="../Scripts/Angular/ngDialog.min.js"></script>

    <script type="text/javascript" src="../Scripts/Bootstrap/bootbox.min.js"></script>
    <script type="text/javascript" src="../Scripts/Bootstrap/ui-bootstrap-tpls-0.10.0.min.js"></script>
    <script type="text/javascript" src="../Scripts/Bootstrap/bootbox.min.js"></script>
    <script type="text/javascript" src="../Scripts/Bootstrap/bootstrap-select.min.js"></script>
    <script type="text/javascript" src="../Scripts/Bootstrap/bootstrap-timepicker.min.js"></script>

    <!-- SharePoint -->
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="/_layouts/15/mquery.js"></script>
    <script type="text/javascript" src="/_layouts/15/callout.js"></script>

    <link href="../Content/Preem.SharePoint.Main.css" rel="stylesheet" />
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/ng-grid.css" rel="stylesheet" />
    <link href="../Content/bootstrap-select.min.css" rel="stylesheet" />
    <link href="../Content/bootstrap-timepicker.css" rel="stylesheet" />

    <link href="../Content/ngDialog.min.css" rel="stylesheet" />
    <link href="../Content/ngDialog-theme-default.min.css" rel="stylesheet" />
    <link href="../Content/ngDialog-theme-plain.min.css" rel="stylesheet" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/Preem.SharePoint.Main.js"></script>
    <script type="text/javascript" src="../Scripts/Preem.SharePoint.Controllers.js"></script>
    <script type="text/javascript" src="../Scripts/Preem.SharePoint.Services.js"></script>
    <script type="text/javascript" src="../Scripts/Preem.SharePoint.Ajax.js"></script>
    <script type="text/javascript" src="../Scripts/Preem.SharePoint.Dialogs.js"></script>

    <link href="../Content/QUnit%201.14.0.css" rel="stylesheet" />
    <script src="../Scripts/QUnit/QUnit%201.14.0.js"></script>

</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

<h2>Unit Tests</h2>
        <div id="qunit"></div>
        <div id="qunit-fixture"></div>

    <script type="text/javascript">

        QUnit.test("hello test", function (assert) {
            assert.ok(1 == "1", "Passed!");
        });

        function getUser_Test() {
            QUnit.asyncTest("Get User", function (assert) {
                expect(1);
                Preem.Template.Application.UserName = '';

                getUserName().then(function userFetched() {
                    var testValue = Preem.Template.Application.UserName;
                    assert.ok(Preem.Template.Application.UserName.length > 0, "User name fetched ok: " + Preem.Template.Application.UserName);
                    QUnit.start();
                });
                
            });

        }

    </script>

    <div>
        <button type="button" onclick="getUser_Test()" value="Get User Test">Get User Test</button>
    </div>
</asp:Content>
