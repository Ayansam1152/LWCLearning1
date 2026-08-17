import { LightningElement, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountClass.getAccounts';

export default class AccountChild2 extends LightningElement {
    @api searchTextChild2;

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
        }
      
    }

    @wire(getAccounts,{searchText:'$searchTextChild2'}) accountRecords;

}