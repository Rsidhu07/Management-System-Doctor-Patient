// Home Page
//routes

console.log("this is routes");
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

FlowRouter.notFound =  { 
    action: function() {

        BlazeLayout.render('not-found');

    }
};