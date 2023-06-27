/**
 * @Description       : 
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 27-06-2023
 * @Comments          :  
 * Modifications Log
 * Ver   Date         Author                                              Modification
 * 1.0   27-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/
public with sharing class CurrentUserController {
     @AuraEnabled
    public static User getCurrentUser() {
    	User toReturn = [SELECT Id, FirstName, LastName , Email FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];
        return toReturn;
    }
}