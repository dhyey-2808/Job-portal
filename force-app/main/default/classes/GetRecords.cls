/**
 * @Description       : 
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 09-06-2023
 * @Comments          :  
 * Modifications Log
 * Ver   Date         Author                                              Modification
 * 1.0   05-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/
public without sharing class GetRecords {
    // Fetching the records from Job Post Object
    @AuraEnabled(cacheable=true)
    public static List<JobPost__c> getJobRecords(){
        List<JobPost__c> jobdata;
        jobdata = [Select Id, Name, Stage__c, Company__r.Name, Job_Description__c  from  JobPost__c  ORDER BY Name ];
        System.debug(jobdata);
        return(jobdata);
    } 

    // for file upload 
    @AuraEnabled
    public static String uploadFile(String base64, String filename, String recordId) {
        ContentVersion cv = createContentVersion(base64, filename);
        ContentDocumentLink cdl = createContentLink(cv.Id, recordId);
        if (cv == null || cdl == null) { 
            return null; 
        }
        return cdl.Id;
    }

    private static ContentVersion createContentVersion(String base64, String filename) {
        ContentVersion cv = new ContentVersion();
        cv.VersionData = EncodingUtil.base64Decode(base64);
        cv.Title = filename;
        cv.PathOnClient = filename;
        try {
            insert cv;
            return cv;
        } catch(DMLException e) {
            System.debug(e);
            return null;
        }
    }


    private static ContentDocumentLink createContentLink(String contentVersionId, String recordId) {
        if (contentVersionId == null || recordId == null) { 
            return null; 
        }
        ContentDocumentLink cdl = new ContentDocumentLink();
        cdl.ContentDocumentId = [ SELECT ContentDocumentId FROM ContentVersion WHERE Id =: contentVersionId].ContentDocumentId;
        cdl.LinkedEntityId = recordId;
        cdl.ShareType = 'V';
        try {
            insert cdl;
            return cdl;
        } catch(DMLException e) {
            System.debug(e);
            return null;
        }
    }

    // insert account for the inserted candidate
    @AuraEnabled
    public static String createJobCandidate(Wrapper wrapper){
        try {
            if(wrapper!=null){
                System.debug(wrapper);
                Candidate_detail__c updatecandidate;
                updatecandidate = [SELECT Id,name,Account_Lookup__r.Id, JobPost__r.Id  FROM Candidate_detail__c WHERE Id = :wrapper.candidate];
                System.debug(updatecandidate);
                updatecandidate.Account_Lookup__c= wrapper.account;
                updatecandidate.JobPost__c = wrapper.jobpost;
                Database.upsert(updatecandidate); 
            }
        //    return '';
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return 'done';
        
    }

}