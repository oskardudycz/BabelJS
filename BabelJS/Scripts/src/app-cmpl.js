define("app", ["exports", "Excalibur", "LinkViewModel", "LinksListViewModel"], function (exports, _Excalibur, _LinkViewModel, _LinksListViewModel) {
    "use strict";

    $(document).ready(function () {
        _Excalibur.Bind(new _LinksListViewModel.LinksListViewModel([new _LinkViewModel.LinkViewModel("link1", "author1"), new _LinkViewModel.LinkViewModel("link2", "author2")]));
    });
});