import PatientRecords from '../../imports/collections';
import { PatientSurgeryRecords } from '../../imports/collections';
import Images from '../../imports/imagesCollection.js';

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


  Template.viewPatientRecords.helpers({
    fileReference(){ 
      let image =  Images.findOne({userId: Meteor.userId()});
      console.log("image length is", image.currentFile);
      
      return image.currentFile._id + "." + image.currentFile.extension;
      
   }
});

Template.modalForm.events({

'submit .add-patientSurgeryDetails': function(event){

    event.preventDefault();

    const target             = event.target;
    const surgeryNumber      = target.surgeryNumber.value;
    const dateofSurgery      = target.dateofSurgery.value;
    const surgeryDescription = target.description.value;

    const surgeryData = {
      surgeryNumber,
      dateofSurgery,
      surgeryDescription

    };

    

    Meteor.call('updatePatientSurgeryDetails', surgeryData);

    window.alert("Patient Record added Successfully");

  }

});