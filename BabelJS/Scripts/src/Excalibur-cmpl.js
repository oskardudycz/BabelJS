define("Excalibur", ["exports", "Helpers", "ViewLocator"], function (exports, _Helpers, _ViewLocator) {
    "use strict";

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var Excalibur = (function () {
        function Excalibur() {
            _classCallCheck(this, Excalibur);
        }

        _createClass(Excalibur, null, [{
            key: "Bind",
            value: function Bind(rootViewModel) {
                var templateName = arguments[1] === undefined ? "main" : arguments[1];

                var tags = _Helpers.findBindingComments($("body"), "template", templateName);
                var $jq = $(tags[0]);
                $jq.after(Excalibur.RenderViewModel(rootViewModel, $jq));
            }
        }, {
            key: "RenderViewModel",
            value: function RenderViewModel(viewModel, $jq) {
                var $template = $(_ViewLocator.Instance.getViewFor(viewModel).getHtml());

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Object.getOwnPropertyNames(viewModel.__proto__)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var key = _step.value;

                        if (key == "constructor") continue;

                        console.log(key);

                        var $element = $template.find("#" + key);

                        var val = viewModel[key];

                        if (val instanceof Array) {
                            var tags = _Helpers.findBindingComments($template, "foreach in", key);
                            var $endTag = $(tags[1]);

                            val.map(function (vm) {
                                return Excalibur.RenderViewModel(vm);
                            }).forEach(function (f) {
                                return $endTag.before(f);
                            });
                        } else if ($element.length == 0) {
                            continue;
                        } else if (val instanceof Function) {
                            $element[0].onclick = _Helpers.bind(val, viewModel);
                        } else {
                            $element.text(val);
                            $template.find("#" + key + ":input").val(val);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator["return"]) {
                            _iterator["return"]();
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
            key: "RenderArray",
            value: function RenderArray() {}
        }]);

        return Excalibur;
    })();

    var Bind = Excalibur.Bind;
    exports.Bind = Bind;
});