Template.Dashboard.helpers({
    admin: function() {
        return Roles.userIsInRole(Meteor.userId(),'super-admin');
    }
});

Template.Dashboard.helpers({

    currentUserName: function(){
        
       return Meteor.user().profile.name;

    },


});