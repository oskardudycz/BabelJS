import * as Helpers from "Helpers";
import * as ViewLocator from "ViewLocator";

class Excalibur {
    static Bind(rootViewModel, templateName = 'main') {
        
        var tags = Helpers.findBindingComments($('body'), 'template', templateName);
        var $jq = $(tags[0]);
        $jq.after(Excalibur.RenderViewModel(rootViewModel, $jq));
    }
     
    static RenderViewModel(viewModel, $jq) {
        var $template  = $(ViewLocator.Instance.getViewFor(viewModel).getHtml());
   
        for (let key of Object.getOwnPropertyNames(viewModel.__proto__)) {
            if(key == 'constructor')
                continue;
          
            console.log(key);
          
            var $element = $template.find('#' + key);
                                        
            let val = viewModel[key];

            if(val instanceof Array){
                var tags = Helpers.findBindingComments($template, 'foreach in', key);
                var $endTag = $(tags[1])

                val.map(vm => Excalibur.RenderViewModel(vm))
                   .forEach(f => $endTag.before(f));
            }          
            else if($element.length == 0){
                continue;
            }
            else if(val instanceof Function){
                $element[0].onclick = Helpers.bind(val, viewModel);
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

export var Bind = Excalibur.Bind;
