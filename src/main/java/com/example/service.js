const express = require('express');
const urlencoded = require('body-parser').urlencoded;
const app = express();
const port = 1337;

app.use(urlencoded({extended: false}));
var userID;
const VoiceResponse = require('twilio').twiml.VoiceResponse
var sqlConn = require('./app.js');

app.all('/', (request, response) => {

    //Get UserID
    response.type('xml');
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
        action: '/password'
    });
    gather.say('Enter UserID');
    response.send(twiml.toString())

})

app.all('/password', (request, response) => {

    //Get Password
    userID = request.body.Digits;
    const twiml = new VoiceResponse();

    const gather = twiml.gather({
        action: '/validate'
    });
    gather.say('Enter Password');

    response.type('text/xml');
    response.send(twiml.toString());
})

app.all('/validate', async (request, response) => {

    const password = request.body.Digits;
    const twiml = new VoiceResponse();
    
    twiml.say(`Your username is: ${userID}. Your password is ${password}.`);

    //Validate User
    
    var isValid = await sqlConn.validateUser(userID, password); 
    console.log("Test");
    console.log(isValid);

    //var check = sqlConn.test()
    //console.log(check)








    //Read keypads
    var actions = new Array;
    //var keypadNum = new Array;
    //gather input
    var userInput;
    if(userInput == 1)
    {
        //actions[0]
    }else if(userInput == 2)
    {
         //actions[1]
    }else if(userInput == 3){
         //actions[2]
    }

    response.type('text/xml');
    response.send(twiml.toString());
})

app.listen(port, () =>{

    console.log(`Example app listening at http://localhost:${port}`)
})