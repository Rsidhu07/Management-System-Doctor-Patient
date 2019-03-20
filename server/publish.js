import Images from '../imports/imagesCollection';

Meteor.publish('allUsers', function(){
    if(Roles.userIsInRole(this.userId, 'super-admin')) {    
    return Meteor.users.find({});
   }
});

  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });
