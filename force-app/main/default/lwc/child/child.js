import { LightningElement, api } from 'lwc';

export default class Child extends LightningElement {

    refreshMsg = 'Data not refreshed yet';
    counter= 0;

    @api
    refreshData(){
        this.counter++;
        this.refreshMsg = 'Data refreshed successfully'+ ' '+this.counter+' times';
        console.log(this.refreshMsg);
    }
}