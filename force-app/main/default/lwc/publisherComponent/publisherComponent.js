import { LightningElement } from 'lwc';

export default class PublisherComponent extends LightningElement {
    name = '';

    handleChange(event)
    {
        this.name = event.target.value;
    }

    handleClick(event)
    {
        // code for send msg to subscriber
    }
}