import { Meteor } from "meteor/meteor";
import PatientDocRecords from '../imports/collections';
import  SimpleSchema  from 'simpl-schema';
import { check } from "meteor/check";
import { PatientSurgeryRecords, PatientVisitRecords } from '../imports/collections';

const myMethodObjArgSchema = new SimpleSchema({ 'fullName': String, 'dateofBirth' : String, 'location': String, 'nationality': String, 'bloodGroup': String}, { check });

Meteor.methods({
    toggleAdmin(id){      
        if(Roles.userIsInRole(id, 'super-admin')){
            Roles.removeUsersFromRoles(id, 'super-admin');
        } else {
            Roles.addUsersToRoles(id, 'super-admin');

        }
    },
    
    
    'updatePatientDetails'(data){

        console.log("update patient record method called***********************");

        myMethodObjArgSchema.validate(data);

        if(!Meteor.userId()){
    
            console.log("Error called");
    
            throw new Meteor.Error('not-authorized');
        }

        PatientDocRecords.insert({
            'fullName'     : data.fullName ,
            'dateofBirth'  : data.dateofBirth,
            'location'     : data.location,
            'nationality'  : data.nationality ,
            'bloodGroup'   : data.bloodGroup,
            createdAt      : new Date(),
            owner          : Meteor.userId(),
            username       : Meteor.user().profile.name,
            
        });

        

    },

    'updatePatientSurgeryDetails'(surgeryData){

        if(!Meteor.userId()){
    
            console.log("Error called");
    
            throw new Meteor.Error('not-authorized');
        }     


        PatientSurgeryRecords.insert({
            'surgeryNumber'      : surgeryData.surgeryNumber,
            'dateofSurgery'      : surgeryData.dateofSurgery,
            'surgeryDescription' : surgeryData.surgeryDescription,
            'doctorId'           : surgeryData.doctorId,
            'doctorName'         : surgeryData.doctorName,
                createdAt        : new Date(),
                owner            : Meteor.userId(),
                username         : Meteor.user().profile.name,
        });

    },

    'updateSelectedPatientSurgeryDetails'(surgeryData){

        if(!Meteor.userId()){
    
            console.log("Error called");
    
            throw new Meteor.Error('not-authorized');
        }

        PatientVisitRecords.update({surgeryId: surgeryData.tempSelectedRecordID}, {
            $set:{
                surgeryNumber : surgeryData.surgeryNumber,
                }
        }, { multi: true });

        PatientSurgeryRecords.update( surgeryData.tempSelectedRecordID,  {
            $set:{ surgeryNumber      : surgeryData.surgeryNumber,
                    dateofSurgery     : surgeryData.dateofSurgery,
                    surgeryDescription: surgeryData.surgeryDescription
                }
          });
    },

    'updateSelectedPatientVisitDetails'(updateVisitData){

        if(!Meteor.userId()){
    
            console.log("Error called");
    
            throw new Meteor.Error('not-authorized');
        }

        PatientVisitRecords.update(updateVisitData.tempSelectedRecordID, {

            $set:{
                visitNumber          : updateVisitData.visitNumber,
                dateofVisit          : updateVisitData.dateofVisit,
                visitDescription     : updateVisitData.visitDescription
            }

        });

        
    },

    'deleteSelectedVisitRecord': function(data){

        if(!Meteor.userId()){
    
            console.log("Error called");
    
            throw new Meteor.Error('not-authorized');
        }

        PatientVisitRecords.remove(data._id);


    },

    'deleteSelectedSurgeryRecord': function(data){

        if(!Meteor.userId()){
    
            console.log("Error called");
    
            throw new Meteor.Error('not-authorized');
        }

        PatientVisitRecords.remove({surgeryId: data._id});
        PatientSurgeryRecords.remove(data._id);
    },

    'addPatientVisit': function(visitData){

        

        if(!Meteor.userId()){
    
            console.log("Error called");
    
            throw new Meteor.Error('not-authorized');
        }

        const addedVisitRecordId = PatientVisitRecords.insert({

            'visitNumber'     : visitData.visitNumber,
            'dateofVisit'     : visitData.dateofVisit,
            'visitDescription': visitData.visitDescription,
            'surgeryNumber'   : visitData.surgeryNumber,
            'surgeryId'       : visitData.surgeryId,
             createdAt        : new Date(),
             owner            : Meteor.userId(),
             username         : Meteor.user().profile.name,

        });

        PatientSurgeryRecords.update(visitData.surgeryId, {
            $set: {visitId : addedVisitRecordId}
        })
    }
});