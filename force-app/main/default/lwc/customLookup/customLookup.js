/**
 * @Description       : 
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 26-06-2023
 * @Comments          :  
 * Modifications Log
 * Ver   Date         Author                                              Modification
 * 1.0   21-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/
import { LightningElement, wire, track } from 'lwc';
import getContactsforLookup from '@salesforce/apex/ContactSearchforLookup.getContactsforLookup';

export default class CustomLookup extends LightningElement {
    @track contactName = '';
    @track contactList = [];
    @track contactId;
    @track isshow = false;
    @track messageResult = false;
    @track isShowResult = true;
    @track showSearchedValues = false;
    @wire(getContactsforLookup, { contName: '$contactName' })
    retrieveContacts({ error, data }) {
        this.messageResult = false;
        if (data) {
            // Data handling
            console.log('data::' + data.length);
            if (data.length > 0 && this.isShowResult) {
                this.contactList = data;
                this.showSearchedValues = true;
                this.messageResult = false;
            }
            else if (data.length == 0) {
                this.contactList = [];
                this.showSearchedValues = false;
                if (this.contactName != '')
                    this.messageResult = true;
            }

        } else if (error) {
            // Error handling
            this.contactId = '';
            this.contactName = '';
            this.contactList = [];
            this.showSearchedValues = false;
            this.messageResult = true;
        }
    }
    handleClick(event) {
        this.isShowResult = true;
        this.messageResult = false;
    }
    handleKeyChange(event) {
        this.messageResult = false;
        this.contactName = event.target.value;
    }
    handleParentSelection(event) {
        this.showSearchedValues = false;
        this.isShowResult = false;
        this.messageResult = false;
        //Set the parent calendar id
        this.contactId = event.target.dataset.value;
        //Set the parent calendar label
        this.contactName = event.target.dataset.label;
        console.log('contactId::' + this.contactId);
        // Dispatches the event.
        const selectedEvent = new CustomEvent('getselectedvalue', { detail: this.contactId });
        this.dispatchEvent(selectedEvent);
    }

}