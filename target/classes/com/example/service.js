const express = require('express');
const urlencoded = require('body-parser').urlencoded;
const app = express();
const port = 1337;

app.use(urlencoded({extended: false}));
var userID;
const VoiceResponse = require('twilio').twiml.VoiceResponse
const sqlConn = require('./app.js');

app.all('/', (request, response) => {

    response.type('xml');
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
        action: '/password'
    });
    gather.say('Enter UserID');
    response.send(twiml.toString())

})

app.all('/password', (request, response) => {

    userID = request.body.Digits;
    const twiml = new VoiceResponse();

    const gather = twiml.gather({
        action: '/validate'
    });
    gather.say('Enter Password');

    response.type('text/xml');
    response.send(twiml.toString());
})

app.all('/validate', (request, response) => {

    const password = request.body.Digits;
    const twiml = new VoiceResponse();
    
    twiml.say(`Your username is: ${userID}. Your password is ${password}.`);

    sqlConn.validateUser(userID, password);
    
    response.type('text/xml');
    response.send(twiml.toString());
})

app.listen(port, () =>{

    console.log(`Example app listening at http://localhost:${port}`)
})