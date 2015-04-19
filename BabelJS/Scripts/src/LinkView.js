import * as ViewModule from 'View'
import *  as ViewLocator from 'ViewLocator'

class LinkView extends ViewModule.View {
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


ViewLocator.Instance['LinkView'] = new LinkView();