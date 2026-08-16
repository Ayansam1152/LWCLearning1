import { LightningElement } from 'lwc';

export default class ParentLifecycle extends LightningElement {
    error;
    stack;

    constructor(){
        super(); // parent constructor
        console.log('parent Constructor called');
    }

    connectedCallback(){
        console.log('parent connected callback called');
    }

    renderedCallback(){
        console.log('parent rendered call back called');
    }

    disconnectedCallback(){
        console.log('parent disconnected callback called');
    }

    errorCallback(error, stack)
    {
        this.error = error;
        this.stack = stack;

        console.log('parent error callback called');
    }
}