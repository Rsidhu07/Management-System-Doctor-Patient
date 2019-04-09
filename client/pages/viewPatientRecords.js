import Images from '../../imports/imagesCollection.js';
import PatientDocRecords, { PatientVisitRecords } from '../../imports/collections';
import { PatientSurgeryRecords } from '../../imports/collections';


Template.viewPatientRecords.helpers({

    recordsPrint(){

        return PatientDocRecords.find({owner: Meteor.userId()});
    },

    currentUserRole(){
        
        return Meteor.user().profile.category;

    },

    surgeryRecordsPrint(){

        return PatientSurgeryRecords.find( { $or:[ {owner: Meteor.userId()}, {doctorId: Meteor.userId()} ] } );
    },

    surgeryVisitRecordsPrint(){

        return PatientVisitRecords.find({ $or:[ {owner: Meteor.userId()}, {doctorId: Meteor.userId()} ] });

    }    
});

Template.viewTableForDocView.helpers({

  viewTableForDocViewPrint(){
    console.log("***********************", (PatientSurgeryRecords.find( { doctorId: Meteor.userId() } ).count()));
    if(PatientSurgeryRecords.find( { doctorId: Meteor.userId() } ).count()){
    
      const patID = PatientSurgeryRecords.find( { doctorId: Meteor.userId() } ).fetch();
      console.log("*****Inside Table VIEW FOR  DOC VIEW", patID);
      const patientID = [];

      patID.forEach(element => {
        patientID.push(element.owner);
    });

    console.log("*************VIEW TABLE FOR DOC VIEW**********************", PatientSurgeryRecords.find( { doctorId: Meteor.userId() } ).fetch());
    console.log("*****PaTIENT ID IS********", patientID);
    Session.set('tempPatientOwnerID', patientID);
    

    return PatientSurgeryRecords.find( { doctorId: Meteor.userId() } ).fetch() ? PatientSurgeryRecords.find({owner: { $in: patientID }}): "No data Found" ;
    }
  }
});

Template.viewVisitTableForDocView.helpers({

  viewVisitTableForDocViewPrint(){

    console.log("***********************", (PatientSurgeryRecords.find( { doctorId: Meteor.userId() } ).count()));
    if(PatientSurgeryRecords.find( { doctorId: Meteor.userId() } ).count()){
     const patientID = Session.get('tempPatientOwnerID');

    return PatientVisitRecords.find({owner: { $in: patientID }}) ;
    }
  }

});

Template.viewPatientRecords.onCreated(function(){
    Meteor.subscribe('files.images.all');
    Meteor.subscribe('allPatients');
    Meteor.subscribe('allPatientsSurgeryRecord');
    Meteor.subscribe('allPatientsVisitRecord');
    Meteor.subscribe('allUsers');
      
  
  });


  Template.viewPatientRecords.helpers({
    fileReference(){ 
      let image =  Images.findOne({userId: Meteor.userId()});

      if(image && image.currentFile) return image.currentFile._id + "." + image.currentFile.extension;
      
   }
});

Template.modalForm.helpers({
 
  findAllRegisteredDoctors(){
    return Meteor.users.find({roles: "doctor"});
}

});

Template.modalForm.events({

'submit .add-patientSurgeryDetails': function(event){

    event.preventDefault();

    const target             = event.target;
    const surgeryNumber      = target.surgeryNumber.value;
    const dateofSurgery      = target.dateofSurgery.value;
    const surgeryDescription = target.description.value;
    const doctorId           = target.selectedID.value;
    const doctorProfile      = Meteor.users.find({_id:doctorId}).fetch();
    const doctorName         = doctorProfile[0].profile.name;

    const surgeryData = {
      surgeryNumber,
      dateofSurgery,
      surgeryDescription,
      doctorId,
      doctorName
    };

    
    console.log(Meteor.users.find({_id: doctorId}).fetch());

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
      const surgeryId        = Session.get('tempSelectedRecordSurgeryId');
      

      const visitData = {

        visitNumber,
        dateofVisit,
        visitDescription,
        surgeryNumber,
        surgeryId

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

    const data = this;

    bootbox.confirm({
      message: "This will lead to deletion of the selected record and will delete all the associated Visit Records, Do you still want to delete the Record?",
      buttons: {
          confirm: {
              label: 'Yes',
              className: 'btn-primary'
          },
          cancel: {
              label: 'No',
              className: 'btn-primary'
          }
      },
      callback: function (result) {
          console.log("*****************************",result);
        if(result){
            Meteor.call('deleteSelectedSurgeryRecord', data);
          } else { console.log("Operation cancelled!")}
      }
  });
   

  },

  'click .btn-delVisit': function(event){

   
    Meteor.call('deleteSelectedVisitRecord', this);
 
   },

  'click .btn-addVisit': function(){

    Session.set('tempSelectedRecordSurgeryNumber', this.surgeryNumber);
    Session.set('tempSelectedRecordSurgeryId', this._id);

  }  

});

Template.viewTableForAdminView.helpers({

  viewSurgeryrecordsPrint(){

    return PatientSurgeryRecords.find({});
  }

});

Template.viewVisitTableForAdminView.helpers({

  viewVisitTablesPrint(){

    return PatientVisitRecords.find({});
  }

});

