import './updatePatientRecords.html';
import Images from '../../imports/imagesCollection.js';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';


Template.updatePatientRecords.events({

    'submit .add-patientDetails': function(event, template){

        event.preventDefault();


        const target       = event.target;
        const fullName     = target.fullName.value;
        const dateofBirth  = target.dateofBirth.value;
        const location     = target.location.value;
        const nationality  = target.nationality.value;
        const bloodGroup   = target.bloodGroup.value;

        const data = {
          target,
          fullName,
          dateofBirth,
          location,
          nationality,
          bloodGroup

        };

        Meteor.call('update-patient-details', data);
        

        console.log("Event is : ",fullName, "", dateofBirth, "" , location, "", nationality, "" ,bloodGroup);

        if (target.inputFile.files && target.inputFile.files[0]) {
            // We upload only one file, in case
            // there was multiple files selected
            const file = target.inputFile.files[0]; 
            if (file) {
              const uploadInstance = Images.insert({
                file: file,
                streams: 'dynamic',
                chunkSize: 'dynamic'
              }, false);
      
              uploadInstance.on('start', function() {
                template.currentUpload.set(this);
              });
      
              uploadInstance.on('end', function(error, fileObj) {
                if (error) {
                  window.alert('Error during upload: ' + error.reason);
                } else {
                  window.alert('File "' + fileObj.name + '" successfully uploaded');
                }
                template.currentUpload.set(false);
              });
      
              uploadInstance.start();
            }
          }
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

  })

  Template.updatePatientRecords.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);
    Meteor.subscribe('files.images.all');
    // console.log("djdhshkjd", abc.ready());
    // // Meteor.subscribe('files.images.all')
    // setTimeout(()=>{
    //     console.log("autorunaboveif");
    //     if(abc.ready()){
    //     console.log("autorun");
    //     }
    // },2000)
});
  
  Template.updatePatientRecords.helpers({
    currentUpload() {
      return Template.instance().currentUpload.get();
    },



  });