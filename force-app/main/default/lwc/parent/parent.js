import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {

    handleRefresh(){
        var result = this.template.querySelector('c-child');

        result.refreshData();
    }
}