import Images from '../imports/imagesCollection';
import PatientRecords from '../imports/collections.js';
import { PatientSurgeryRecords } from '../imports/collections';

Meteor.publish('allUsers', function(){
    if(Roles.userIsInRole(this.userId, 'super-admin')) {    
    return Meteor.users.find({});
   }
});

  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });

  Meteor.publish('allPatients', function () {
    return PatientRecords.find({});
  });

  Meteor.publish('allPatientsSurgeryRecord', function () {
    return PatientSurgeryRecords.find({});
  });