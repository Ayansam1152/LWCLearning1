import { LightningElement } from 'lwc';

export default class WireExample3 extends LightningElement {
    name = 'World';

    handleClick(event) {
        this.name = this.template.querySelector('.inputClass').value;
    }
}