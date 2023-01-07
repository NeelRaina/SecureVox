package com.example;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Gather;
import com.twilio.twiml.voice.Say;

import static spark.Spark.*;

public class Example {
    public static void main(String[] args) {
        
        

        post("/", (request, response) -> {
            
            Say say  = new Say.Builder(
                    "Enter UserID.")
                    .build();
            Gather gather = new Gather.Builder().action("/").say(say).build();
            Say say2  = new Say.Builder(
                    "Enter Password.")
                    .build();
            Gather gather2 = new Gather.Builder().action("/").say(say2).build();        
            VoiceResponse voiceResponse = new VoiceResponse.Builder()
                    .gather(gather)
                    .gather(gather2)
                    .build();
                          
            return voiceResponse.toXml();

        });

        
       
    }

}