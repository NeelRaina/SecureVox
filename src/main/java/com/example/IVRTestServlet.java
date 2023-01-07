package com.example;

import com.twilio.twiml.voice.Gather;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Say;
import com.twilio.twiml.TwiMLException;
import com.twilio.http.HttpMethod;

public class IVRTestServlet {
    public static void main(String[] args) {
        Say say = new Say
            .Builder("Enter Your User ID").build();
        Gather gather = new Gather.Builder()
            .finishOnKey("#")
            .method(HttpMethod.GET).say(say).build();
        Say say2 = new Say
            .Builder("We didn't receive any input. Goodbye!").build();
        VoiceResponse response = new VoiceResponse.Builder().gather(gather)
            .say(say2).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
