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

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function () {
                    var key = _step.value;

                    if (key == 'constructor') return 'continue';

                    var val = viewModel[key];
                    console.log(key);

                    if (viewModel[key] instanceof Array) {
                        elements = $('');
                        items = viewModel[key].map(function (vm) {
                            return Excalibur.RenderViewModel(vm);
                        });

                        items.forEach(function (f) {
                            return $template.find('#' + key).before(f);
                        });

                        $template.find('#' + key).remove();
                    } else if (viewModel[key] instanceof Function) {
                        $template.find('#' + key)[0].onclick = bind(viewModel[key], viewModel);
                        console.log('function');
                    } else {
                        $template.find('#' + key).text(viewModel[key]);
                        $template.find('#' + key + ':input').text(viewModel[key]);
                    }
                };

                for (var _iterator = Object.getOwnPropertyNames(viewModel.__proto__)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var elements;
                    var items;

                    var _ret = _loop();

                    if (_ret === 'continue') continue;
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
            this._template.find('#' + propertyName).text(this[propertyName]);
            this._template.find('#' + propertyName + ':input').val(this[propertyName]);
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
            return '<div  class="list-group-item"> <h3 class="list-group-item-heading">   <span class="glyphicon glyphicon-plus-sign  pull-right" id="inrementRating"/><span id="link"/></h3><div> <h4 class="list-group-item-text"><span class="badge pull-right" id="rating"></span><span id="author"></span></h4>  </div>';
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
            return '<div><h1 id="header"/> <ul class="list-group"><foreach id="linksList"></ul></foreach> </div>';
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