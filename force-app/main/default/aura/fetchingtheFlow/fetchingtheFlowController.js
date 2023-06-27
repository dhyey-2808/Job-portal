/**
 * @Description       : 
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 27-06-2023
 * @Comments          :  
 * Modifications Log
 * Ver   Date         Author                                              Modification
 * 1.0   27-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/
({
    init : function(component, event, helper) {

        var flow = component.find("flowData");
        flow.startFlow("perdefinedInputs");
    }
})