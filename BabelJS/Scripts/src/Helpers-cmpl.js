define("Helpers", ["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.bind = bind;
    exports.findComments = findComments;
    exports.findBindingComments = findBindingComments;

    function bind(func, fixThis) {
        // using custom bind for simplicity
        return function () {
            return func.apply(fixThis, arguments);
        };
    }

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
        var bindingCommentStart = " " + bindingName + " " + variableName + " ";
        var bindingCommentEnd = " /" + bindingName + " " + variableName + " ";

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
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return [startTag, endTag];
    }
});