export function bind(func, fixThis) { // using custom bind for simplicity
    return function() {
        return func.apply(fixThis, arguments)
    }
}

Node = Node || {
    COMMENT_NODE: 8
};

export function findComments(elem) {
    var children = elem.childNodes;
    var comments = [];

    for (var i=0, len=children.length; i<len; i++) {
        if (children[i].nodeType == Node.COMMENT_NODE) {
            comments.push(children[i]);
        }
        if(children[i].childNodes.length >= 0){
            comments = comments.concat(findComments(children[i]));
        }
    }
    return comments;
}

export function findBindingComments($elem, bindingName, variableName){
    var comments = findComments($elem[0]);
    var bindingCommentStart = ` ${bindingName} ${variableName} `;
    var bindingCommentEnd = ` /${bindingName} ${variableName} `;
    
    var startTag;
    var endTag;

    for(var comm of comments) {
        if(comm.nodeValue == bindingCommentStart)
            startTag = comm;
    else if (comm.nodeValue == bindingCommentEnd)
            endTag = comm;
    }

    return [startTag, endTag];
}