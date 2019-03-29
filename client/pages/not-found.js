
Template.notFound.onCreated(function(){

    HTTP.call( 'GET', 'https://api.thecatapi.com/v1/images/search', {}, function( error, response ) {
        if ( error ) {
          console.log( error );
        } else {
          const kittyUrl =  response.data[0].url;
      
          console.log(kittyUrl);
          
         Session.set('tempKittyUrl', kittyUrl);
        }
      }); 
    
});


Template.notFound.helpers({

   'kittyApi': function(){

    return Session.get('tempKittyUrl');
    }

});