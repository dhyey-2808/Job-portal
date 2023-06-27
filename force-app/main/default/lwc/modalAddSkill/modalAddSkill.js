/**
 * @Description       : 
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 15-06-2023
 * @Comments          :  
 * Modifications Log
 * Ver   Date         Author                                              Modification
 * 1.0   13-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/
import { LightningElement,api } from 'lwc';
import LightningModal from 'lightning/modal';
import SKILL_LIST from '@salesforce/schema/Skill__c.Skill_List__c'
import CONTACT_DATA from '@salesforce/schema/Skill__c.Contact__c'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ModalAddSkill extends (LightningElement, LightningModal) {
    // @api objectApiName;
    @api recordId;
    fields = [SKILL_LIST];
    @api contactId;

    handleSuccess(event) {
        // this.dispatchEvent(new CustomEvent('success'));
        const evt = new ShowToastEvent({
            title: 'Skill Added',
            message: 'Your Skill Was added: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }

    handleSubmit(event) {
        console.log(event.detail.fields);
        console.log(JSON.parse(JSON.stringify(this.contactId)));
        const fields = event.detail.fields;
        fields.Contact__c = JSON.parse(JSON.stringify(this.contactId));
        console.log(fields);
        this.template.querySelector('lightning-record-form').submit(fields);
    }
    handlecancel() {
        this.close('Cancel');
    }
}