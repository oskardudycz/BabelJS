function bind(func, fixThis) { // using custom bind for simplicity
    return function() {
        return func.apply(fixThis, arguments)
    }
}

// Thanks to Yoshi
Node = Node || {
    COMMENT_NODE: 8
};

function findComments(elem) {
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

function findBindingComments($elem, bindingName, variableName){
    var comments = findComments($elem[0]);
    var bindingCommentStart = ` ${bindingName} in ${variableName} `
    var bindingCommentEnd = ` /${bindingName} in ${variableName} `


    var startTag;
    var endTag;

    for(var comm of comments){
        if(comm.nodeValue == bindingCommentStart)
            startTag = comm;
        else if (comm.nodeValue == bindingCommentEnd)
            endTag = comm;
    }

    return [startTag, endTag];
}


class Excalibur {
    static Bind(rootViewModel, selector = '#exContainer') {
        var $jq = $(selector);
        $jq.empty()
        $jq.append(Excalibur.RenderViewModel(rootViewModel, $jq));
    }


 
    static RenderViewModel(viewModel, $jq) {
        var $template  = $(ViewLocator.Instance().getViewFor(viewModel).getHtml());
   
        for (let key of Object.getOwnPropertyNames(viewModel.__proto__)) {
            if(key == 'constructor')
                continue;
          
            console.log(key);
          
            var $element = $template.find('#' + key);
                                        
            let val = viewModel[key];

            if(val instanceof Array){
                var tags = findBindingComments($template, 'foreach', key);
                var $endTag = $(tags[1])

                val.map(vm => Excalibur.RenderViewModel(vm))
                   .forEach(f => $endTag.before(f));
            }          
            else if($element.length == 0){
                continue;
            }
            else if(val instanceof Function){
                $element[0].onclick = bind(val, viewModel);
            }  
            else{
                $element.text(val);
                $template.find('#' + key + ':input').val(val);
            }
        }
        viewModel.bind($template);
        return $template;
    }
    static RenderArray() {
   
    }    
}

class View {
    getHtml () {
        return '';
    }
}

class ViewModel {
    bind($template){
        this._template = $template;
    }
    notifyOfPropertyChange(propertyName){
        console.log(`${propertyName} has been changed`);
        this._template.find(`#{propertyName}`).text(this[propertyName]);
        this._template.find(`#{propertyName}:input`).val(this[propertyName]);
    }
}

class LinkView extends View {
    constructor(){
        super();
    }

    getHtml () {
        return `<div  class="list-group-item">
                    <h3 class="list-group-item-heading">
                        <span class="glyphicon glyphicon-plus-sign  pull-right" id="inrementRating"/>
                        <span id="link"/>
                    </h3>
                    <h4 class="list-group-item-text">
                        <span class="badge pull-right" id="rating"></span>
                        <span id="author"></span>
                    </h4>
                </div>`;
    }
}

class LinkViewModel extends ViewModel {
    constructor(link, author) {
      super();
    
        this._link = link;
        this._author = author;
        this._rating = 0;
    }
  
    get link(){
        return this._link;
    } 
  
    get author(){
        return this._author;
    }
  
    get rating(){
        return this._rating;
    }
  
    inrementRating(){
        this._rating++;
        super.notifyOfPropertyChange('rating')
    }
  
}

class LinksListView extends View {
    constructor(){
        super();
    }

    getHtml () {
        return `<div>
                    <h1 id="header"/> 
                    <ul class="list-group">
                        <!-- foreach in linksList -->
                        <!-- /foreach in linksList -->
                    </ul>
                </div>`;
    }
}

class ViewLocator {
    constructor(){
        this.LinksListView = new LinksListView();
        this.LinkView = new LinkView();
    }

    getViewFor(viewModel){
        var viewModelName = viewModel.constructor.name;

        var viewName = viewModelName.toString().replace('Model', '');

        return this[viewName];
    }

    static Instance(){
        return new ViewLocator();
    }
}

class LinksListViewModel extends ViewModel {
    constructor(){
        super();
        this._linksList = [ new LinkViewModel('link1','author1'), new LinkViewModel('link2','author2') ];
    }
  
    get header(){
        return 'Najlepsze linki tygodnia'
    }
  
    get linksList(){
        return this._linksList;
    }
  
    //getSth(){
    //    return 'ddd';
    //}
}

$(document).ready(function() {
    Excalibur.Bind(new LinksListViewModel());
});