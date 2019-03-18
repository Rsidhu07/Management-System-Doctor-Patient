let MyLogoutFunc = function(){
    Session.set('nav-toggle', '');
    FlowRouter.go('/');
};


AccountsTemplates.configure({

    confirmPassword: false,
    privacyUrl: 'privacy',
    termsUrl: 'terms-of-use',
    onLogoutHook: MyLogoutFunc

});


AccountsTemplates.addFields([

    {
        _id        : 'firstName',
        type       : 'text',
        displayName: 'First Name',
        required   : true,
        re         : /(?=.*[a-z])(?=.*[A-Z])/,
        errStr     : 'At least 1 lower-case and 1 upper-case',
    },{
        _id: 'category',
        type: 'select',
        displayName: 'Category',
        select: [
            {
                text: 'SuperAdmin',
                value: 'super-admin'
            }, {
                text: 'Doctor',
                value: 'doctor'
            }, {
                text : 'Patient',
                value: 'patient'
            }
        ]
    }

]);