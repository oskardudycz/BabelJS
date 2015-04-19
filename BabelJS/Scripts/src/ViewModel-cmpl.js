define("ViewModel", ["exports"], function (exports) {
    "use strict";

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var ViewModel = (function () {
        function ViewModel() {
            _classCallCheck(this, ViewModel);
        }

        _createClass(ViewModel, [{
            key: "bind",
            value: function bind($template) {
                this._template = $template;
            }
        }, {
            key: "notifyOfPropertyChange",
            value: function notifyOfPropertyChange(propertyName) {
                console.log("" + propertyName + " has been changed");

                this._template.find("#" + propertyName).text(this[propertyName]);
                this._template.find("#" + propertyName + ":input").val(this[propertyName]);
            }
        }]);

        return ViewModel;
    })();

    exports.ViewModel = ViewModel;
});