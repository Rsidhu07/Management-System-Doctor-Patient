Meteor.publish('allUsers', function(){
    if(Roles.userIsInRole(this.userId, 'super-admin')) {    
    return Meteor.users.find({});
   }
});