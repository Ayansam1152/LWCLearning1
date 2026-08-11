import { LightningElement, wire, api } from 'lwc';
import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';

export default class WireExample2 extends LightningElement {

    // for wire decorator we need adapterId and adapterConfig
    @api recordId;
    @wire(getAccountList, {accountId:'$recordId'}) accounts;

    // connectedCallback() {
    //     console.log('COMPONENT LOADS SUCCESSFULLY');
    //     console.log('accounts: ' + JSON.stringify(this.accounts));
    // }
}