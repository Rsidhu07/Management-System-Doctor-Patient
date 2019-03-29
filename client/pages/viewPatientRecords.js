import PatientDocRecords, { PatientVisitRecords } from '../../imports/collections';
import { PatientSurgeryRecords } from '../../imports/collections';
import Images from '../../imports/imagesCollection.js';

Template.viewPatientRecords.helpers({

    recordsPrint(){

        return PatientDocRecords.find({username: Meteor.user().profile.name});
    },

    currentUserRole(){
        
        return Meteor.user().profile.category;

    },

    surgeryRecordsPrint(){

        return PatientSurgeryRecords.find({username: Meteor.user().profile.name});
    },

    surgeryVisitRecordsPrint(){

        return PatientVisitRecords.find({});

    },  
});

Template.viewPatientRecords.onCreated(function(){
    Meteor.subscribe('files.images.all');
    Meteor.subscribe('allPatients');
    Meteor.subscribe('allPatientsSurgeryRecord');
    Meteor.subscribe('allPatientsVisitRecord');
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

Template.modalFormEdit.events({

  'submit .update-patientSurgeryDetails': function(event){
  
      event.preventDefault();
  
      let tempSelectedRecordID = Session.get('tempSelectedRecordID');

      const target             = event.target;
      const surgeryNumber      = target.surgeryNumber.value;
      const dateofSurgery      = target.dateofSurgery.value;
      const surgeryDescription = target.description.value;
  
      const surgeryData = {
        surgeryNumber,
        dateofSurgery,
        surgeryDescription,
        tempSelectedRecordID
  
      }; 
      Meteor.call('updateSelectedPatientSurgeryDetails', surgeryData); 
    }
  
  });

  Template.modalFormAddVisit.events({

    'submit .add-patientVisitDetails': function(event){

      event.preventDefault();
      // event.stopPropagation();

      const target           = event.target;
      const visitNumber      = target.visitNumber.value;
      const dateofVisit      = target.dateofVisit.value;
      const visitDescription = target.visitDescription.value;
      const surgeryNumber    = Session.get('tempSelectedRecordSurgeryNumber');

      const visitData = {

        visitNumber,
        dateofVisit,
        visitDescription,
        surgeryNumber

      };

      Meteor.call('addPatientVisit', visitData);

      window.alert("Visit Record has been updated successfully");
      
    }

  });

  Template.modalFormEdit.helpers({

    editDataHelper(){

      return Session.get('tempSelectedRecord');
    }

  });

  Template.modalFormEditVisit.helpers({

    editDataVisitHelper(){

        return Session.get('tempSelectedRecord');
    }

  });

Template.modalFormEditVisit.events({

  'submit .update-patientVisitDetails': function(event){

    event.preventDefault();

    let tempSelectedRecordID = Session.get('tempSelectedRecordID');

    const target           = event.target;
    const visitNumber      = target.visitNumber.value;
    const dateofVisit      = target.dateofVisit.value;
    const visitDescription = target.visitDescription.value;


    const updateVisitData = {

      visitNumber,
      dateofVisit,
      visitDescription,
      tempSelectedRecordID

    };

    Meteor.call('updateSelectedPatientVisitDetails', updateVisitData);

    window.alert("Visit Record has been updated successfully");

  }

 

});

Template.viewPatientRecords.events({

  'click .btn-edit': function(event){

    Session.set('tempSelectedRecordID', this._id);

    Session.set('tempSelectedRecord', this);

  },
  'click .btn-del': function(event){

   Meteor.call('deleteSelectedSurgeryRecord', this);

  },

  'click .btn-delVisit': function(event){

    Meteor.call('deleteSelectedVisitRecord', this);
 
   },

  'click .btn-addVisit': function(){

    Session.set('tempSelectedRecordSurgeryNumber', this.surgeryNumber);

  }  

});

