package com.example;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Gather;
import com.twilio.twiml.voice.Say;

import static spark.Spark.*;

public class Example {
    public static void main(String[] args) {
        
        

        post("/", (request, response) -> {
            
            Say say  = new Say.Builder(
                    "Enter User")
                    .build();
            //Gather gather = new Gather.Builder().action("/").say(say).build();
            Gather gather1 = new Gather.Builder().build();
            Say say2  = new Say.Builder(
                    "Enter Password.")
                    .build();
            Gather gather2 = new Gather.Builder().action("/").say(say2).build();        
            VoiceResponse voiceResponse = new VoiceResponse.Builder()
                    .say(say)
                    .gather(gather1)
                    .gather(gather2)
                    .build();
                          
            return voiceResponse.toXml();

        });

        
       
    }

}