import './updatePatientRecords.html';


Template.updatePatientRecords.events({

    'submit .add-patientDetails': function(event){

        event.preventDefault();


        const target       = event.target;
        const fullName     = target.fullName.value;
        const dateofBirth  = target.dateofBirth.value;
        const location     = target.location.value;
        const nationality  = target.nationality.value;
        const bloodGroup   = target.bloodGroup.value;

        console.log("Event is : ",fullName, "", dateofBirth, "" , location, "", nationality, "" ,bloodGroup);
    }

});