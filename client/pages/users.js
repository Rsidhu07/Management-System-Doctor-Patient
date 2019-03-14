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
        return Roles.userIsInRole(this._id, 'super-admin') ? 'super-admin' : 'normal user';
    }
});