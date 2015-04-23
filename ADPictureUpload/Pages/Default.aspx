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
    <script type="text/javascript" src="/_layouts/15/SP.UserProfiles.js"></script>
    <script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>

    <link href="../Content/Preem.SharePoint.Main.css" rel="stylesheet" />
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/ng-grid.css" rel="stylesheet" />
    <link href="../Content/bootstrap-select.min.css" rel="stylesheet" />
    <link href="../Content/bootstrap-timepicker.css" rel="stylesheet" />


    <link href="../Content/ngDialog.min.css" rel="stylesheet" />
    <link href="../Content/ngDialog-theme-default.min.css" rel="stylesheet" />
    <link href="../Content/ngDialog-theme-plain.min.css" rel="stylesheet" />

    <!-- Add your CSS -->
    <link href="../Content/App.css" rel="stylesheet" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/Preem.SharePoint.Main.js"></script>
    <script type="text/javascript" src="../Scripts/Preem.SharePoint.Ajax.js"></script>
    <script type="text/javascript" src="../Scripts/UploadApp/UploadAppController.js"></script>
    <script type="text/javascript" src="../Scripts/Service/UploadAppService.js"></script>
    <script type="text/javascript" src="../Scripts/UploadApp/SettingsController.js"></script>

</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Uppdatera din profilbild
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div ng-app="templateApp" class="main">
        <%--<div id="leftmenu" class="leftmenu">
            <h3>Left Menu</h3>
            
            <ul id="UnitTests"></ul>
            
        </div>--%>

        <div id="maincontent" class="maincontent">
             <div class="bb-alert alert alert-info" style="display: none;">
                <span></span>
            </div>
            <div ng-view></div>
            
        </div>

        <div id="allusers" class="hidden">
        </div>
    </div>

</asp:Content>
