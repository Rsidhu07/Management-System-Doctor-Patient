Template.MainNav.events({

    'click .login-toggle' : ()=> {
        Session.set('nav-toggle', 'open');
    },

    'click .logout': ()=>{

        AccountsTemplates.logout();

    }
});

Template.MainNav.helpers({

    currentUserName: function(){
        
       return Meteor.user().profile.firstName;

    },


});