'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var View = (function () {
    function View(options) {
        _classCallCheck(this, View);

        this.model = options.model;
        this.template = options.template;

        console.log('test3');
    }

    _createClass(View, [{
        key: 'render',
        value: function render() {
            return _.template(this.template, this.model.toObject());
        }
    }]);

    return View;
})();