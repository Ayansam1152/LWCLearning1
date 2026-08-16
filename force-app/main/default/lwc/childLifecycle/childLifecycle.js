import { LightningElement } from 'lwc';

export default class ChildLifecycle extends LightningElement {
    error;
    stack;

    constructor(){
        super(); // parent constructor
        console.log('child Constructor called');
    }

    connectedCallback(){
        console.log('child connected callback called');
    }

    renderedCallback(){
        console.log('child rendered call back called');
    }

    disconnectedCallback(){
        console.log('child disconnected callback called');
    }

    errorCallback(error, stack)
    {
        this.error = error;
        this.stack = stack;

        console.log('child error callback called');
    }

}