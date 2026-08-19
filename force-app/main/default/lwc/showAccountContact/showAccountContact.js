
import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { LightningElement, wire, api } from 'lwc';
import Surya from '@salesforce/messageChannel/surya__c';
import getAccountContacts from '@salesforce/apex/AccountClass.getAccountContacts';
import LightningConfirm from "lightning/confirm";
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class ShowAccountContact extends LightningElement {

    subscription = null;
    accountId;
    accountName;
    title;
    contacts;
    hasContacts;
    isAccountSelected = false;
    isAddContactClicked = false;
    isEditContactClicked = false;
    @api recordId;
    editableContactId;

    @wire(MessageContext) messageContext;


    connectedCallback()
    {
        this.handleSubscribe();
    }

    disconnectedCallback()
    {
        this.handleUnsubscribe();
    }

    handleSubscribe()
    {
        if(!this.subscription)
        {
            this.subscription = subscribe(this.messageContext, Surya, 
                (param) => 
                {
                    this.accountId = param.accountId;
                    this.accountName= param.accountName;
                    
                    this.title = this.accountName+"'s contacts"
                    this.getContacts();

                    //console.log(this.contacts);
                }
            );

            console.log("I am from subscribe method");
        }
    }

    async getContacts()
    {
        this.contacts = await getAccountContacts({accountId: this.accountId});

        this.hasContacts = this.contacts.length > 0 ? true : false;

        this.isAccountSelected = true;
    }

    handleUnsubscribe()
    {
        unsubscribe(this.subscription);
        this.subscription= null;

        console.log("I am from un-subscribe method");
    }

    handleAddContact(event)
    {
        this.isAddContactClicked = true;
    }

    handleAddContactCancel(event)
    {
        this.isAddContactClicked = false;
    }

    handleEditContact(event)
    {
        this.isEditContactClicked = true;
        this.editableContactId = event.target.dataset.contactId;
        //console.log(this.editableContactId+" I am from handle edit method");
    }

    handleEditContactCancel(event)
    {
        this.isEditContactClicked = false;
    }

    handleSuccess(event)
    {
        this.isAddContactClicked = false;
        this.isEditContactClicked = false;
        this.getContacts();
    }

   async handleContactDelete(event)
    {
         this.editableContactId = event.target.dataset.contactId;
        const result = await LightningConfirm.open({
            message: "Are you sure? You want to delete contact",
            variant: "headerless",
            label: "this is the aria-label value",
            // setting theme would have no effect
        });
        //Confirm has been closed
        //result is true if OK was clicked
        //and false if cancel was clicked

        if(result)
        {
           let deleteResult =  await deleteRecord(this.editableContactId);
            console.log(this.editableContactId+" I am from handle delete method");
            this.getContacts();
            this.showToast();
        }
    }

    showToast() {
    const event = new ShowToastEvent({
      title: "Contact Deleted",
      message:
        "Contact is deleted successfully",
    });
    this.dispatchEvent(event);
  }
}