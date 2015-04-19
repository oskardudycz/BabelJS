define('LinkView', ['exports', 'View', 'ViewLocator'], function (exports, _View, _ViewLocator) {
    'use strict';

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

    var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

    var LinkView = (function (_ViewModule$View) {
        function LinkView() {
            _classCallCheck(this, LinkView);

            _get(Object.getPrototypeOf(LinkView.prototype), 'constructor', this).call(this);
        }

        _inherits(LinkView, _ViewModule$View);

        _createClass(LinkView, [{
            key: 'getHtml',
            value: function getHtml() {
                return '<div  class="list-group-item">\n                    <h3 class="list-group-item-heading">\n                        <span class="glyphicon glyphicon-plus-sign  pull-right" id="inrementRating"/>\n                        <span id="link"/>\n                    </h3>\n                    <h4 class="list-group-item-text">\n                        <span class="badge pull-right" id="rating"></span>\n                        <span id="author"></span>\n                    </h4>\n                </div>';
            }
        }]);

        return LinkView;
    })(_View.View);

    _ViewLocator.Instance.LinkView = new LinkView();
});