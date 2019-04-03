
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
      
      HTTP.call( 'GET', 'https://api.thedogapi.com/v1/images/search', {}, function( error, response ) {
        if ( error ) {
          console.log( error );
        } else {
          const dogUrl =  response.data[0].url;
      
          console.log(dogUrl);
          
         Session.set('tempDogUrl', dogUrl);
        }
      });
    
});


Template.notFound.helpers({

   'kittyApi': function(){

    return Session.get('tempKittyUrl');
    },

    'dogApi': function(){

      return Session.get('tempDogUrl');
      }

});

Template.notFound.events({

  'click .getImageDog': function(){
    return HTTP.call( 'GET', 'https://api.thedogapi.com/v1/images/search', {}, function( error, response ) {
      if ( error ) {
        console.log( error );
      } else {
        const dogUrl =  response.data[0].url;
    
        console.log(dogUrl);
        
       Session.set('tempDogUrl', dogUrl);
      }
    });
  },

  'click .getImageCat': function(){

    return HTTP.call( 'GET', 'https://api.thecatapi.com/v1/images/search', {}, function( error, response ) {
      if ( error ) {
        console.log( error );
      } else {
        const kittyUrl =  response.data[0].url;
    
        console.log(kittyUrl);
        
       Session.set('tempKittyUrl', kittyUrl);
      }
    });
  }

});