import moment from 'moment';
import PatientDocRecords from '../../imports/collections';


Template.Users.onCreated(function(){
    this.autorun(() => {
        this.subscribe('allUsers');
        this.subscribe('allPatients');
    });
});

Template.Users.helpers({
    users: function() {
        return Meteor.users.find();
    },
    userEmail: function(){
        return this.emails[0].address;
    },
    isAdmin: function() {
        return Roles.userIsInRole(this._id, 'super-admin') ? 'super-admin' : Roles.userIsInRole(this._id, 'patient') ? 'patient' : Roles.userIsInRole(this._id, 'doctor') ? 'doctor' : 'normal user' ;
    },
    dateFormat: function(){
        return moment(this.createdAt).format('MMMM D YYYY');
    },
    editMode: function(){
        return Session.get('currentUser')? 'edit-mode': '';
    },
    currentEdit: function(){
        if(Session.get('currentUser')){
        let user= Session.get('currentUser');
        return user._id === this._id;
        }
    },
    currentUserProfileView(){
        if(Session.get('SelectedUsersProfiledata')){
        return Session.get('SelectedUsersProfiledata');
        }
    }
});

Template.Users.events({

    'click .user_id': function(){
        Session.set('currentUser', this);
    },
    'click .toggle-admin': function(){
     
            Meteor.call('toggleAdmin', this._id);

    },
    'click .close-edit-mode': function() {
        Session.set('currentUser', "");
    },

    'click .userprofileview': function(){
    let userProfileRecord = PatientDocRecords.find({owner: this._id}).fetch();
    Session.set('SelectedUsersProfiledata', userProfileRecord[0]);
    },

    'click .btn-delUser': function(event){

        const data = this;

        bootbox.confirm({
          message: '<h4>This will lead to deletion of the selected User record and will delete all the selected User\'s information, Do you still want to delete the User Account?</h4>',
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
              
            if(result){
                if(Roles.userIsInRole(Meteor.userId(), 'super-admin')){
                console.log("Delete operation called", data);
                Meteor.call('deleteSelectedUserSurgeryRecord', data);
                Meteor.call('deleteSelectedUserAccount', data);
                }
            } else { console.log("Operation cancelled!")}
          }
      });
    }
});
