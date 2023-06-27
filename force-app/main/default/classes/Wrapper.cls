/**
 * @Description       : 
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 09-06-2023
 * @Comments          :  
 * Modifications Log
 * Ver   Date         Author                                              Modification
 * 1.0   07-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/
public without sharing class Wrapper {
    
    @AuraEnabled
    public string jobpost { get; set; }
    @AuraEnabled
    public string candidate {get;set;}
    @AuraEnabled
    public string account { get; set; }
    
    
}