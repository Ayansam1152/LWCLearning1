import { LightningElement } from 'lwc';

export default class ConditionalRendering extends LightningElement {

    flag = false;
    
    handleCheckBox(event)
    {
        this.flag = event.target.checked;
    }
}