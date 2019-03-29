// Home Page
//routes


FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render("HomeLayout", {main: "Home"});
    }
});

// Home Page
FlowRouter.route('/dashboard', {
    name: 'dashboard',
    action() {
        BlazeLayout.render("AppLayout", {main: "Dashboard"});
    }
});

let adminRoutes = FlowRouter.group({
    prefix : '/admin',
    name : 'admin'
});

adminRoutes.route('/users', {
    name: 'users',
    action() {
        BlazeLayout.render("AppLayout", {main: "Users"});
    }
})

//Group Routes for Patient
let patientRoutesUpdate = FlowRouter.group({
    prefix : '/update',
    name   : 'update'
});

patientRoutesUpdate.route('/patientProfileUpdate', { 

    name : 'patientsUpdate',
    action(){
        BlazeLayout.render("AppLayout", {main: "updatePatientRecords"});
    }
})

let patientRoutesView = FlowRouter.group({
    prefix : '/view',
    name   : 'view' 
});

patientRoutesView.route('/patientProfileView', { 

    name : 'patientsView',
    action(){
        BlazeLayout.render("AppLayout", {main: "viewPatientRecords"});
    }
})


//Page not Found route
FlowRouter.notFound =  { 
    action: function() {

        BlazeLayout.render('notFound');

    }
};

//Privacy Policy Route
FlowRouter.route('/privacypolicy', {
    name: 'privacyPolicy',
    action() {
        BlazeLayout.render("AppLayout", {main: "PrivacyPolicy"});
    }
});

//Terms of use Route
FlowRouter.route('/termsofuse', {
    name: 'termsOfUse',
    action() {
        BlazeLayout.render("AppLayout", {main: "TermsofUse"});
    }
});

//Group Routes for Doctor

let doctorRoutesUpdate = FlowRouter.group({
    prefix : '/update',
    name   : 'update'
});

doctorRoutesUpdate.route('/doctorProfileUpdate', { 

    name : 'doctorsUpdate',
    action(){
        BlazeLayout.render("AppLayout", {main: "updateDoctorRecords"});
    }
})

let doctorRoutesView = FlowRouter.group({
    prefix : '/view',
    name   : 'view' 
});

doctorRoutesView.route('/doctorProfileView', { 

    name : 'doctorsView',
    action(){
        BlazeLayout.render("AppLayout", {main: "viewDoctorRecords"});
    }
})