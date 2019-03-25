import PatientRecords from '../../imports/collections';
import { PatientSurgeryRecords } from '../../imports/collections';

Template.viewPatientRecords.helpers({

    recordsPrint(){

        return PatientRecords.find({username: Meteor.user().profile.name});
    },

    currentUserRole(){
        
        return Meteor.user().profile.category;

    },

    surgeryRecordsPrint(){

        return PatientSurgeryRecords.find({username: Meteor.user().profile.name});
    }
   
});

Template.viewPatientRecords.onCreated(function(){
    Meteor.subscribe('files.images.all');
    Meteor.subscribe('allPatients');
    Meteor.subscribe('allPatientsSurgeryRecord');
  });