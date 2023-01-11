const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;
const app = express();
var user;
var pass;

// Parse incoming POST params with Express middleware
app.use(urlencoded({ extended: false }));

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/voice', (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();

  // Use the <Gather> verb to collect user input
  const gather = twiml.gather({
    numDigits: 3,
    action: '/gather',
  });
  gather.say('Enter UserID.');

  // If the user doesn't enter input, loop
  twiml.redirect('/voice');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

// Create a route that will handle <Gather> input
app.post('/gather', (request1, response1) => {
    // Use the Twilio Node.js SDK to build an XML response
    const twiml1 = new VoiceResponse();
    // If the user entered digits, process their request
    if (request1.body.Digits) {
        
        user = JSON.stringify(request1.body.Digits);

        // Use the <Gather> verb to collect user input
        const gather2 = twiml1.gather({
            numDigits: 2,
          action: '/validate',
        });
        gather2.say('Enter Password.');
      
    } else {
      // If no input was sent, redirect to the /voice route
      twiml1.redirect('/voice');
    }
  
    // Render the response as XML in reply to the webhook request
    response1.type('text/xml');
    response1.send(twiml1.toString());
  });

// Create a route that will handle Second <Gather> input
app.post('/validate', (request2, response2) => {
    // Use the Twilio Node.js SDK to build an XML response
    const twiml2 = new VoiceResponse();
  
    // If the user entered digits, process their request
    if (request2.body.Digits) {
        
        pass = JSON.stringify(request2.body.Digits);
        
        twiml2.say('Your username is ' + user + '.Your password is' + pass + '. Goodbye!');
        

    } else {
      // If no input was sent, redirect to the /voice route
      twiml2.redirect('/voice');
    }
  
    // Render the response as XML in reply to the webhook request
    response2.type('text/xml');
    response2.send(twiml2.toString());
  });
// Create an HTTP server and listen for requests on port 3000
console.log('Twilio Client app HTTP server running at http://127.0.0.1:1337');
app.listen(1337);
