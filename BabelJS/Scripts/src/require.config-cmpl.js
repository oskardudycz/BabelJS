define("require.config", ["exports"], function (exports) {
    /// <reference path="require.config.js" />
    "use strict";

    var require = {
        paths: {
            bootstrap: "/Scripts/bootstrap.min",
            jquery: "/Scripts/jquery-1.10.2.min",
            Helpers: "/Scripts/src/Helpers-cmpl",
            View: "/Scripts/src/View-cmpl",
            ViewModel: "/Scripts/src/ViewModel-cmpl",
            ViewLocator: "/Scripts/src/ViewLocator-cmpl",
            Excalibur: "/Scripts/src/Excalibur-cmpl",
            LinkView: "/Scripts/src/LinkView-cmpl",
            LinksListView: "/Scripts/src/LinksListView-cmpl",
            LinkViewModel: "/Scripts/src/LinkViewModel-cmpl",
            LinksListViewModel: "/Scripts/src/LinksListViewModel-cmpl",
            app: "/Scripts/src/app-cmpl" },
        shim: {
            bootstrap: { deps: ["jquery"] },
            app: { deps: ["LinkView", "LinksListView"] } }
    };
});