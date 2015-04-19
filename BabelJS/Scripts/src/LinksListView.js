import * as ViewModule from 'View'
import *  as ViewLocator from 'ViewLocator';

export class LinksListView extends ViewModule.View {
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

ViewLocator.Instance['LinksListView'] = new LinksListView();