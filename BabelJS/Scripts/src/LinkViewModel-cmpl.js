define('LinkViewModel', ['exports', 'ViewModel'], function (exports, _ViewModel) {
  'use strict';

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var LinkViewModel = (function (_ViewModelModule$ViewModel) {
    function LinkViewModel(link, author) {
      _classCallCheck(this, LinkViewModel);

      _get(Object.getPrototypeOf(LinkViewModel.prototype), 'constructor', this).call(this);

      this._link = link;
      this._author = author;
      this._rating = 0;
    }

    _inherits(LinkViewModel, _ViewModelModule$ViewModel);

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
  })(_ViewModel.ViewModel);

  exports.LinkViewModel = LinkViewModel;
});