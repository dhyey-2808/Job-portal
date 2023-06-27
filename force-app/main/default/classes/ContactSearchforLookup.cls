/**
 * @Description       : 
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 26-06-2023
 * @Comments          :  
 * Modifications Log
 * Ver   Date         Author                                              Modification
 * 1.0   21-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/
public with sharing class ContactSearchforLookup {

    @AuraEnabled(cacheable=true)
    // Fetching the contact name as per the name mentioned by user
    public static List<Contact> getContactsforLookup(String contName){
        List<Contact> contatList = new List<Contact>();
        if(contName!=''){
            String contactName = '%' + contName + '%';
            contatList = [select id,name from Contact where name like:contactName];
            return contatList;  
        }
        return contatList;   
    }
}