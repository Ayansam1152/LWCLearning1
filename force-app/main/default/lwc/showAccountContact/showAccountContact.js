
import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import Surya from '@salesforce/messageChannel/surya__c';
import getAccountContacts from '@salesforce/apex/AccountClass.getAccountContacts';

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

                    console.log(this.contacts);
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
    }

    handleEditContactCancel(event)
    {
        this.isEditContactClicked = false;
    }
}