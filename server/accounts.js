let postSignUp = function(userId, info){
   console.log(userId);
   console.log(info.profile.category);
   Roles.addUsersToRoles(userId, ['super-admin', info.profile.category]);

};
//hi
AccountsTemplates.configure({
    postSignUpHook: postSignUp 

});


