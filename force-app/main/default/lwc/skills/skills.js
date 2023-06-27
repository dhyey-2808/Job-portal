/**
 * @Description       : 
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 15-06-2023
 * @Comments          :  
 * Modifications Logcolumns
 * Ver   Date         Author                                              Modification
 * 1.0   08-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/
import { LightningElement, track, api, wire } from 'lwc';
import Id from '@salesforce/user/Id';
import getContactId from '@salesforce/apex/SkillsData.getContactId';
import getContact from '@salesforce/apex/SkillsData.getContact';
import modalAddSkill from 'c/modalAddSkill';
import modalEditSkill from 'c/modalEditSkill';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import LightningAlert from 'lightning/alert';


const columns = [
    { label: 'Skills', fieldName: 'Skill_List__c' },
    { label: 'Status', fieldName: 'Status__c' },
    {
        type: "button", label: 'Edit', initialWidth: 100, typeAttributes: {
            label: 'Edit',
            name: 'Edit',
            title: 'Edit',
            disabled: false,
            value: 'Edit',
            iconPosition: 'left',
            iconName: 'utility:edit',
            variant: 'Brand'

        }
    },
    {
        type: "button", label: 'Delete', initialWidth: 110, typeAttributes: {
            label: 'Delete',
            name: 'Delete',
            title: 'Delete',
            disabled: false,
            value: 'Delete',
            iconPosition: 'left',
            iconName: 'utility:delete',
            variant: 'destructive'
        }
    }
]

export default class Skills extends LightningElement {
    @track USER_ID = Id;
    @track wireResult = [];
    @api contactId;
    columns = columns;
    data;
    recordOptions = [];

    @wire(getContactId, { USER_ID: '$USER_ID' }) wired(value) {
        this.wireResult = value;
        const { error, data } = value;

        if (data) {
            // console.log('id' + data);
            // this.contactId = data;

            let mydata = data;
            let dataJSON = JSON.stringify(mydata);
            console.log('dataJSON:', dataJSON);
            let dataArray = [];
            dataArray = JSON.parse(dataJSON);
            console.log("dataArray", dataArray);
            this.recordOptions = dataArray;
            console.log('recordOptions::', this.recordOptions);
            
        } else if (error) {
            this.error = error;
        }
    }

    @wire(getContact, { USER_ID: '$USER_ID' }) wired1({ error, data }) {
        if (data) {
            console.log("retireved data is " + data);
            this.contactId = JSON.parse(JSON.stringify(data));
            console.log("retireved data is " + this.contactId);
        } else if (error) {
            console.error(error);
        }
    }


    showModal = true;
    result;
    async add() {
        this.result = await modalAddSkill.open({
            size: 'small',
            description: 'Skills',
            contactId: this.contactId
        });
        console.log(this.result);
        console.log(this.contactId);
        return refreshApex(this.wireResult);
    }


    rowaction(event) {
        const recId = event.detail.row.Id;
        const status_details = event.detail.row.Status__c;
        console.log(recId);
        console.log(status_details);
        const actionName = event.detail.action.name;
        if (actionName === 'Edit') {
            console.log('edit');
            this.handleAction(recId, 'edit', status_details);
        } else if (actionName === 'Delete') {
            console.log('Delete');
            this.handleDeleteRow(recId, status_details);
        }
        
        
    }

    async handleAction(recordId, mode,Status) {
        if (Status == 'Approved') {
            await LightningAlert.open({
                message: 'Sorry!! It is already approved. Contact Admin for Modification. You can\'t EDIT it ',
                theme: 'error', // a red theme intended for error states
                label: 'Error!', // this is the header text
            });
            return;
        }
        this.result = await modalEditSkill.open({
            size: 'small',
            description: 'Skills',
            mode: mode,
            recordId: recordId
        });

        this.showToast('Success!!', 'Record Updated successfully!!', 'success', 'dismissable');
        console.log(this.result);
        return refreshApex(this.wireResult);


    }
    async handleDeleteRow(recordIdToDelete, Status) {
        if (Status == 'Approved') {
            await LightningAlert.open({
                message: 'Sorry!! Contact Admin for Modification. You can\'t Delete it  ',
                theme: 'error', // a red theme intended for error states
                label: 'Error!', // this is the header text
            });
            return;
        }
        deleteRecord(recordIdToDelete)
            .then(result => {
                this.showToast('Success!!', 'Record deleted successfully!!', 'success', 'dismissable');
                return refreshApex(this.wireResult);
              
            }).catch(error => {
                this.error = error;
            });
    }

    showToast(title, message, variant, mode) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }

    
}