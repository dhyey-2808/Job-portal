/**
 * @Description       : 
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 14-06-2023
 * @Comments          :  
 * Modifications Log
 * Ver   Date         Author                                              Modification
 * 1.0   14-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/
import { LightningElement,api } from 'lwc';
import LightningModal from 'lightning/modal';
import SKILL from '@salesforce/schema/Skill__c.Skill_List__c';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ModalEditSkill extends (LightningElement, LightningModal) {
    @api recordId;
    @api objectApiName = "Skill__c";
    
    @api nameField = SKILL;

    connectedCallback() {
        console.log('recordId::', this.recordId);
        console.log('nameField1::::', this.nameField);
      //  console.log('SkillDemo__cField1::::', this.demo);
    }

    handleSuccess(event) {
        let result = event.detail.id;
        console.log('handleSuccess ::');
        
        this.close('Save');
    }
    handlecancel() {
        this.close('Cancel');
    }
}