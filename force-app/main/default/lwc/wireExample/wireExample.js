import { LightningElement, api, wire } from 'lwc';
import {getRecord,getFieldValue} from 'lightning/uiRecordApi';


export default class WireExample extends LightningElement {
    @api recordId;

    @wire (getRecord, {recordId: '$recordId', fields:['Account.Name', 'Account.Phone']}) accounts;

    get getName(){
        return getFieldValue(this.accounts.data, 'Account.Name');
    }

    get getPhone(){
        return getFieldValue(this.accounts.data,'Account.Phone');
    }
}