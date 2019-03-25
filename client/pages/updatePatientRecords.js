import './updatePatientRecords.html';
import Images from '../../imports/imagesCollection.js';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';




Template.updatePatientRecords.events({

    'submit .add-patientDetails': function(event, template){

        event.preventDefault();


        const target          = event.target;
        const fullName        = target.fullName.value;
        const dateofBirth     = target.dateofBirth.value;
        const location        = target.location.value;
        const nationality     = target.nationality.value;
        const bloodGroup      = target.bloodGroup.value;
        

        const data = {
          fullName,
          dateofBirth,
          location,
          nationality,
          bloodGroup,
          

        };

          console.log("Data is :***********************", data);
        
        

        console.log("Event is : ",fullName, "", dateofBirth, "" , location, "", nationality, "" ,bloodGroup);

        //Code for File/Image handling starts here

        if (target.inputFile.files && target.inputFile.files[0]) {
            // We upload only one file...
            const file = target.inputFile.files[0]; 
            if (file) {
              const uploadInstance = Images.insert({
                file   : file,
                streams: 'dynamic',
                chunkSize: 'dynamic'
              }, false);
      
              uploadInstance.on('start', function() {
                template.currentUpload.set(this);
              });
      
              uploadInstance.on('end', function(error, fileObj) {
                if (error) {
                  console.log('Error during upload: ' + error.reason);
                } else {
                  console.log('File "' + fileObj.name + '" successfully uploaded');
                }
                template.currentUpload.set(false);
              });
      
              uploadInstance.start();
            }
          }// Code for File/Image Handling ends here.
          
          Meteor.call('updatePatientDetails', data);  

          
    },
    // for surgery details form
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

    }
});

Template.updatePatientRecords.helpers({
     fileRef(){ 
       let image =  Images.find({}).fetch();
       console.log("images length is",image.length);
       
       for(let i=0 ; i < image.length ; i++){
            
            return image[i]._id + "." + image[i].extension;
       
      }
       
    }
});

  Template.updatePatientRecords.onCreated(function(){
    Meteor.subscribe('files.images.all');
    Meteor.subscribe('allPatients');

  });

  Template.updatePatientRecords.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);
    Meteor.subscribe('files.images.all');
   
});
  
  Template.updatePatientRecords.helpers({
    currentUpload() {
      return Template.instance().currentUpload.get();
    },
  });