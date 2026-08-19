import { LightningElement, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountClass.getAccounts';
import { MessageContext, publish } from 'lightning/messageService';
import Surya from '@salesforce/messageChannel/surya__c';

export default class AccountChild2 extends LightningElement {
    @api searchTextChild2;
    @wire(MessageContext) messageContext;

    columns = [
        {label:'Id', fieldName:'Id'},
        {label: 'Name', fieldName:'Name'},
        {label:'Actions', fieldName:'Actions', type:'button',typeAttributes:
            {
                label:'View Contacts',
                value:'view_contacts'
            }
        }
    ]

    connectedCallback()
    {
        console.log("I am from account child 2, account table");
    }

    rows = [
        {Id:'22', Name:'Edge'},
        {Id:'23', Name:'SoldTo'},
        {Id:'24', Name:'ShipTo'},
        {Id:'25', Name:'BillTo'}
    ]

    currentId;
    currentContactName;

    handleRowAction(event)
    {
        if(event.detail.action.value == 'view_contacts')
        {
            this.currentId =  event.detail.row.Id;
            this.currentContactName = event.detail.row.Name;

            const payload = {
                accountId:this.currentId,
                accountName: this.currentContactName
            };

            publish(this.messageContext, Surya, payload);
        }                                                                                
    }

    @wire(getAccounts,{searchText:'$searchTextChild2'}) accountRecords;

}