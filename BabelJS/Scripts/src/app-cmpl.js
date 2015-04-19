'use strict';

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function bind(func, fixThis) {
    // using custom bind for simplicity
    return function () {
        return func.apply(fixThis, arguments);
    };
}

// Thanks to Yoshi
Node = Node || {
    COMMENT_NODE: 8
};

function findComments(elem) {
    var children = elem.childNodes;
    var comments = [];

    for (var i = 0, len = children.length; i < len; i++) {
        if (children[i].nodeType == Node.COMMENT_NODE) {
            comments.push(children[i]);
        }
        if (children[i].childNodes.length >= 0) {
            comments = comments.concat(findComments(children[i]));
        }
    }
    return comments;
}

function findBindingComments($elem, bindingName, variableName) {
    var comments = findComments($elem[0]);
    var bindingCommentStart = ' ' + bindingName + ' in ' + variableName + ' ';
    var bindingCommentEnd = ' /' + bindingName + ' in ' + variableName + ' ';

    var startTag;
    var endTag;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = comments[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var comm = _step.value;

            if (comm.nodeValue == bindingCommentStart) startTag = comm;else if (comm.nodeValue == bindingCommentEnd) endTag = comm;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return [startTag, endTag];
}

var Excalibur = (function () {
    function Excalibur() {
        _classCallCheck(this, Excalibur);
    }

    _createClass(Excalibur, null, [{
        key: 'Bind',
        value: function Bind(rootViewModel) {
            var selector = arguments[1] === undefined ? '#exContainer' : arguments[1];

            var $jq = $(selector);
            $jq.empty();
            $jq.append(Excalibur.RenderViewModel(rootViewModel, $jq));
        }
    }, {
        key: 'RenderViewModel',
        value: function RenderViewModel(viewModel, $jq) {
            var $template = $(ViewLocator.Instance().getViewFor(viewModel).getHtml());

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.getOwnPropertyNames(viewModel.__proto__)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var key = _step2.value;

                    if (key == 'constructor') continue;

                    console.log(key);

                    var $element = $template.find('#' + key);

                    var val = viewModel[key];

                    if (val instanceof Array) {
                        var tags = findBindingComments($template, 'foreach', key);
                        var $endTag = $(tags[1]);

                        val.map(function (vm) {
                            return Excalibur.RenderViewModel(vm);
                        }).forEach(function (f) {
                            return $endTag.before(f);
                        });
                    } else if ($element.length == 0) {
                        continue;
                    } else if (val instanceof Function) {
                        $element[0].onclick = bind(val, viewModel);
                    } else {
                        $element.text(val);
                        $template.find('#' + key + ':input').val(val);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            viewModel.bind($template);
            return $template;
        }
    }, {
        key: 'RenderArray',
        value: function RenderArray() {}
    }]);

    return Excalibur;
})();

var View = (function () {
    function View() {
        _classCallCheck(this, View);
    }

    _createClass(View, [{
        key: 'getHtml',
        value: function getHtml() {
            return '';
        }
    }]);

    return View;
})();

var ViewModel = (function () {
    function ViewModel() {
        _classCallCheck(this, ViewModel);
    }

    _createClass(ViewModel, [{
        key: 'bind',
        value: function bind($template) {
            this._template = $template;
        }
    }, {
        key: 'notifyOfPropertyChange',
        value: function notifyOfPropertyChange(propertyName) {
            console.log('' + propertyName + ' has been changed');
            this._template.find('#{propertyName}').text(this[propertyName]);
            this._template.find('#{propertyName}:input').val(this[propertyName]);
        }
    }]);

    return ViewModel;
})();

var LinkView = (function (_View) {
    function LinkView() {
        _classCallCheck(this, LinkView);

        _get(Object.getPrototypeOf(LinkView.prototype), 'constructor', this).call(this);
    }

    _inherits(LinkView, _View);

    _createClass(LinkView, [{
        key: 'getHtml',
        value: function getHtml() {
            return '<div  class="list-group-item">\n                    <h3 class="list-group-item-heading">\n                        <span class="glyphicon glyphicon-plus-sign  pull-right" id="inrementRating"/>\n                        <span id="link"/>\n                    </h3>\n                    <h4 class="list-group-item-text">\n                        <span class="badge pull-right" id="rating"></span>\n                        <span id="author"></span>\n                    </h4>\n                </div>';
        }
    }]);

    return LinkView;
})(View);

var LinkViewModel = (function (_ViewModel) {
    function LinkViewModel(link, author) {
        _classCallCheck(this, LinkViewModel);

        _get(Object.getPrototypeOf(LinkViewModel.prototype), 'constructor', this).call(this);

        this._link = link;
        this._author = author;
        this._rating = 0;
    }

    _inherits(LinkViewModel, _ViewModel);

    _createClass(LinkViewModel, [{
        key: 'link',
        get: function () {
            return this._link;
        }
    }, {
        key: 'author',
        get: function () {
            return this._author;
        }
    }, {
        key: 'rating',
        get: function () {
            return this._rating;
        }
    }, {
        key: 'inrementRating',
        value: function inrementRating() {
            this._rating++;
            _get(Object.getPrototypeOf(LinkViewModel.prototype), 'notifyOfPropertyChange', this).call(this, 'rating');
        }
    }]);

    return LinkViewModel;
})(ViewModel);

var LinksListView = (function (_View2) {
    function LinksListView() {
        _classCallCheck(this, LinksListView);

        _get(Object.getPrototypeOf(LinksListView.prototype), 'constructor', this).call(this);
    }

    _inherits(LinksListView, _View2);

    _createClass(LinksListView, [{
        key: 'getHtml',
        value: function getHtml() {
            return '<div>\n                    <h1 id="header"/> \n                    <ul class="list-group">\n                        <!-- foreach in linksList -->\n                        <!-- /foreach in linksList -->\n                    </ul>\n                </div>';
        }
    }]);

    return LinksListView;
})(View);

var ViewLocator = (function () {
    function ViewLocator() {
        _classCallCheck(this, ViewLocator);

        this.LinksListView = new LinksListView();
        this.LinkView = new LinkView();
    }

    _createClass(ViewLocator, [{
        key: 'getViewFor',
        value: function getViewFor(viewModel) {
            var viewModelName = viewModel.constructor.name;

            var viewName = viewModelName.toString().replace('Model', '');

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

var LinksListViewModel = (function (_ViewModel2) {
    function LinksListViewModel() {
        _classCallCheck(this, LinksListViewModel);

        _get(Object.getPrototypeOf(LinksListViewModel.prototype), 'constructor', this).call(this);
        this._linksList = [new LinkViewModel('link1', 'author1'), new LinkViewModel('link2', 'author2')];
    }

    _inherits(LinksListViewModel, _ViewModel2);

    _createClass(LinksListViewModel, [{
        key: 'header',
        get: function () {
            return 'Najlepsze linki tygodnia';
        }
    }, {
        key: 'linksList',
        get: function () {
            return this._linksList;
        }

        //getSth(){
        //    return 'ddd';
        //}

    }]);

    return LinksListViewModel;
})(ViewModel);

$(document).ready(function () {
    Excalibur.Bind(new LinksListViewModel());
});