/**
 * @Description       : 
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 25-06-2023
 * @Comments          :  
 * Modifications Log
 * Ver   Date         Author                                              Modification
 * 1.0   16-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/
import { LightningElement, api, track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getContactNameRecords from '@salesforce/apex/KTrecord.getContactNameRecords';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class CloserProcedure extends LightningElement {
    @track keyIndex = 0;
    @track Idofcontact='';
    @track contactname; 
    @api KTtakerId;
    @track error;
    @track message;
    @api ContactId;
    @api KTrecordList1 = [];
    @track KTrecordList = [];

    @wire(getContactNameRecords, { ContactId: '$ContactId' }) wiredata(value) {
        const { data, error } = value;
        if (data) {
            this.contactname = data.Name;
            this.error = undefined;
            console.log('data from ' + data);

        } else if (error) {
            this.error = error;
            this.error = undefined;
            console.error('error is # ' + error);
        }

    }

    connectedCallback() {
        console.log('Enter ', JSON.parse(JSON.stringify(this.KTrecordList)));
        this.KTrecordList = [
            {
                Project_Name__c: '',
                KT_taker__c: '',
                KT_giver__c: this.ContactId
            }
        ];
        this.KTrecordList1 = this.KTrecordList;
        this.dispatchEvent(new FlowAttributeChangeEvent('KTRecordsLIST', this.KTrecordList1));
    }
    
    
    handleKTtaker(event) {
        this.KTtakerId = event.detail;
        this.KTrecordList[event.target.accessKey].KT_taker__c = this.KTtakerId;
        console.log('KT taker ID is:::' + this.KTtakerId);
        this.KTrecordList1 = this.KTrecordList;
        this.dispatchEvent(new FlowAttributeChangeEvent('KTRecordsLIST', this.KTrecordList1));

    }
    
    addRow() {
        this.keyIndex + 1;
        console.log('Enter key index ', this.keyIndex);
        this.KTrecordList.push({
            Project_Name__c: '',
            KT_taker__c: this.KTtakerId,
            KT_giver__c: this.ContactId
        })
        console.log('Enter ', this.KTrecordList);
        this.KTrecordList1 = this.KTrecordList;
        this.dispatchEvent(new FlowAttributeChangeEvent('KTRecordsLIST', this.KTrecordList1));
        console.log("Ktlist" + JSON.stringify(this.ContactId));
    }

    changeHandler(event) {
        console.log('Access key2:' + event.target.accessKey);
        console.log('id:' + event.target.id);
        console.log('value:' + event.target.value);
        if (event.target.name === 'ProjectName')
            this.KTrecordList[event.target.accessKey].Name = event.target.value;
        else if (event.target.name === 'KTtaker') {
            this.KTrecordList[event.target.accessKey].KT_taker__c = event.target.value;
        }
        this.KTrecordList1 = this.KTrecordList;
        this.dispatchEvent(new FlowAttributeChangeEvent('KTRecordsLIST', this.KTrecordList1));
    }

    removeRow(event) {
        console.log('Access key2:' + event.target.accessKey);
        console.log(event.target.id.split('-')[0]);
        if (this.KTrecordList.length >= 1) {
            this.KTrecordList.splice(event.target.accessKey, 1);
            this.keyIndex - 1;
        }
        this.KTrecordList1 = this.KTrecordList;
        this.dispatchEvent(new FlowAttributeChangeEvent('KTRecordsLIST', this.KTrecordList1));
    }

    saveMultipleKTrecord() {
        this.KTrecordList1 = this.KTrecordList;
        console.log("Ktlist" + JSON.stringify(this.KTrecordList1));
        this.dispatchEvent(new FlowAttributeChangeEvent('KTRecordsLIST', this.KTrecordList1));
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Record Created!',
                variant: 'success',
            }),
        );
    }
}