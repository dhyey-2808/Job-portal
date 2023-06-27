/**
 * @Description       : 
 * @author            : Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)
 * @last modified on  : 16-06-2023
 * @Comments          :  
 * Modifications Log
 * Ver   Date         Author                                              Modification
 * 1.0   16-06-2023   Dhyey Dodiya (ChangeMeIn@UserSettingsUnder.SFDoc)   Initial Version
**/
import { LightningElement } from 'lwc';
import LightningModal from 'lightning/modal';

export default class ModalCloseQuestions extends (LightningElement, LightningModal) {
    handlecancel() {
        this.close('Cancel');
    }
}