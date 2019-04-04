import Images from '../imports/imagesCollection';
import PatientDocRecords from '../imports/collections.js';
import { PatientSurgeryRecords, PatientVisitRecords } from '../imports/collections';

Meteor.publish('allUsers', function(){
    if(Roles.userIsInRole(this.userId, 'super-admin')) {    
    return Meteor.users.find({});
   } else if(Roles.userIsInRole(this.userId, 'patient')){
    return Meteor.users.find({});
   }
});

  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });

  Meteor.publish('allPatients', function () {
    return PatientDocRecords.find({});
  });

  Meteor.publish('allPatientsSurgeryRecord', function () {
    return PatientSurgeryRecords.find({});
  });

  Meteor.publish('allPatientsVisitRecord', function () {
    return PatientVisitRecords.find({});
  });
