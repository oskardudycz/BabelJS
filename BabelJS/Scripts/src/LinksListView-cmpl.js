define('LinksListView', ['exports', 'View', 'ViewLocator'], function (exports, _View, _ViewLocator) {
    'use strict';

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

    var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var LinksListView = (function (_ViewModule$View) {
        function LinksListView() {
            _classCallCheck(this, LinksListView);

            _get(Object.getPrototypeOf(LinksListView.prototype), 'constructor', this).call(this);
        }

        _inherits(LinksListView, _ViewModule$View);

        _createClass(LinksListView, [{
            key: 'getHtml',
            value: function getHtml() {
                return '<div>\n                    <h1 id="header"/> \n                    <ul class="list-group">\n                        <!-- foreach in linksList -->\n                        <!-- /foreach in linksList -->\n                    </ul>\n                </div>';
            }
        }]);

        return LinksListView;
    })(_View.View);

    exports.LinksListView = LinksListView;

    _ViewLocator.Instance.LinksListView = new LinksListView();
});