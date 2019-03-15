Meteor.methods({
    toggleAdmin(id){      
        if(Roles.userIsInRole(id, 'super-admin')){
            Roles.removeUsersFromRoles(id, 'super-admin');
        } else {
            Roles.addUsersToRoles(id, 'super-admin');

        }
    }
});