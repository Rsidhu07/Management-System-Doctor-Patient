Template.Users.onCreated(function(){
    this.autorun(() => {
        this.subscribe('allUsers');
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

    }
});