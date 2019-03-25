import { Meteor } from "meteor/meteor";
import PatientRecords from '../imports/collections';
import  SimpleSchema  from 'simpl-schema';
import { check } from "meteor/check";
import { PatientSurgeryRecords } from '../imports/collections';

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

        PatientRecords.insert({
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
            createdAt        : new Date(),
            owner            : Meteor.userId(),
            username         : Meteor.user().profile.name,
        });

    }
    
});