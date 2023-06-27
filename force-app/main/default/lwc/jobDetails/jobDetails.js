/**
 * @Description       : Name
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 12-06-2023
 * @Comments          :  
 * Modifications Log
 * Ver   Date         Author                                              Modification
 * 1.0   05-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/

import { LightningElement, track, wire, api } from 'lwc';
import getJobRecords from '@salesforce/apex/GetRecords.getJobRecords';
import uploadFile from '@salesforce/apex/GetRecords.uploadFile';
import NAME_FIELD from '@salesforce/schema/Candidate_detail__c.Name';
import Email_Field from '@salesforce/schema/Candidate_detail__c.Email__c';
import Phone_Field from '@salesforce/schema/Candidate_detail__c.Phone__c';
import Relavent_Field from '@salesforce/schema/Candidate_detail__c.Relevant_Salesforce_Experience_in_Year__c';
import TotalExp_Field from '@salesforce/schema/Candidate_detail__c.Total_Experience_in_Year__c';
import createJobCandidate from '@salesforce/apex/GetRecords.createJobCandidate';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


// To display the records of Job Post
const columns = [
    { label: 'Job Name', fieldName: 'Name' },
    { label: 'Stage', fieldName: 'Stage__c' },
    { label: 'Company', fieldName: 'CompanyName' },
    { label: 'Description', fieldName: 'Job_Description__c' }

];
export default class JobDetails extends LightningElement {

    @track data;
    @api recordId;
    @api accoundID;
    @api jobID;
    data = [];
    columns = columns;


    // Fetching the records from the apex class
    @wire(getJobRecords, {}) wiredata(value) {
        const { data, error } = value;
        if (data) {
            console.log(data);
            this.data = data.map(
                record => Object.assign(
                    {
                        "CompanyName": record.Company__r.Name,
                    },
                    record
                )
            );

        } else if (error) {
            console.error('error is # ' + error);
        }


    }



    // adding the selected job data into the list
    // selectedRows = [];
    addinlist(event) {
        this.selectedRows = event.detail.selectedRows;

        this.selectedRows.forEach(element => {

            this.jobID = element.Id;
            this.accoundID = element.Company__c;


        });
        console.log('jobID row  are  ', this.jobID);
        console.log('accoundID row  are  ', this.accoundID);
    }

    // To display all the fields of Candidate_detail__c Object
    Objectname = "Candidate_detail__c";
    fields = [NAME_FIELD, Phone_Field, Relavent_Field, TotalExp_Field, Email_Field];

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'Data Added',
            // message: 'Record ID: ' + event.detail.id,
            message: 'Saved Please Add The Resume ',
            variant: 'success',
        });
        this.dispatchEvent(evt);
        console.log('user id is -->' + event.detail.id);
        this.recordId = event.detail.id;

    }

    //Upload document

    fileData
    openfileUpload(event) {
        console.log('in open file');
        const file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = () => {
            var base64 = reader.result.split(',')[1];
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log(this.fileData);
        }
        reader.readAsDataURL(file);
    }

    //on submit button
    handleClick() {
        const { base64, filename, recordId } = this.fileData;
        uploadFile({ base64, filename, recordId }).then(result => {
            this.fileData = null;
            let title = `${filename} and Data Uploaded Successfully!!`;
            this.toast(title);
        })

        this.passdata();
    }

    toast(title) {
        const toastEvent = new ShowToastEvent({
            title,
            variant: "success"
        })
        this.dispatchEvent(toastEvent);
    }

    // pass data to createJobCandidate apex class
    passdata() {
        console.log('in handle job');
        let pass =
        {
            jobpost: this.jobID,
            candidate: this.recordId,
            account: this.accoundID
        };

        console.log(pass);

        createJobCandidate({ wrapper: pass })
            .then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error);
                this.error = error;
            });
    }

    // handleSubmit() {

    //     alert("Submitted");
    //     window.open('/charity/s/contactsupport', '_top')
    // }
}