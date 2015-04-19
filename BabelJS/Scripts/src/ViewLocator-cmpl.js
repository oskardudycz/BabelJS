define('ViewLocator', ['exports'], function (exports) {
    'use strict';

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var ViewLocator = (function () {
        function ViewLocator() {
            _classCallCheck(this, ViewLocator);
        }

        _createClass(ViewLocator, [{
            key: 'getViewFor',
            value: function getViewFor(viewModel) {
                var viewModelName = viewModel.constructor.name;

                var viewName = viewModelName.toString().replace('Model', '');

                if (!this[viewName]) this[viewName] = new window[viewName]();

                return this[viewName];
            }
        }], [{
            key: 'Instance',
            value: function Instance() {
                return new ViewLocator();
            }
        }]);

        return ViewLocator;
    })();

    var Instance = ViewLocator.Instance();
    exports.Instance = Instance;
});