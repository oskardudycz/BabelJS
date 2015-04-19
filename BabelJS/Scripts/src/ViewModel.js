export class ViewModel {
    bind($template){
        this._template = $template;
    }
    notifyOfPropertyChange(propertyName){
        console.log(`${propertyName} has been changed`);

        this._template.find(`#${propertyName}`).text(this[propertyName]);
        this._template.find(`#${propertyName}:input`).val(this[propertyName]);
    }
}