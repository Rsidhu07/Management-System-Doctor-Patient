let postSignUp = function(userId, info){
   console.log(userId);
   console.log(info.profile.category);
   Roles.addUsersToRoles(userId, ['normal-user', info.profile.category]);

};
//hi
AccountsTemplates.configure({
    postSignUpHook: postSignUp 

});


