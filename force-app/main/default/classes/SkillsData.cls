/**
 * @Description       : 
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 15-06-2023
 * @Comments          :  
 * Modifications Log
 * Ver   Date         Author                                              Modification
 * 1.0   09-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/
public without sharing class SkillsData {
    
     @AuraEnabled(cacheable=true)
    public static  List<Skill__c> getContactId(String USER_ID) {
        // System.debug('user id recieved'+USER_ID);
        User currentUser = [SELECT ContactId FROM User WHERE Id = :USER_ID];
        Id currentUserContactId = currentUser.ContactId;
        // return currentUserContactId;
        list<Skill__c> contactSkills = [SELECT Id,Skill_List__c,Status__c,Name,Contact__c FROM Skill__c WHERE Contact__c = :currentUserContactId];        System.debug('Contact Skils'+contactSkills);
        return contactSkills;

        
    //    list<Skill__c> contactSkills=[ SELECT Skill_List__c, Status__c ,OwnerId FROM Skill__c WHERE OwnerId = :USER_ID];
    //    return contactSkills;
    }

    @AuraEnabled(cacheable=true)
    public static String getContact(String USER_ID) {
        System.debug('user id recieved'+USER_ID);
        User currentUser = [SELECT ContactId FROM User WHERE Id = :USER_ID];
        Id currentUserContactId = currentUser.ContactId;
        return currentUserContactId;
    }

    
}