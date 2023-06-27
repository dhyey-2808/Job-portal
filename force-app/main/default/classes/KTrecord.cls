/**
 * @Description       : 
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 26-06-2023
 * @Comments          :  
 * Modifications Log
 * Ver   Date         Author                                              Modification
 * 1.0   19-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/

public with sharing class KTrecord {
    // getting the name for a particular contact
   @AuraEnabled(cacheable = true)
    public static  Contact getContactNameRecords(String ContactId){
        Contact con = new Contact();
         con = [select name from Contact where Id = :ContactId ] ;
        return con;
    }
}