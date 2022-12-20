package com.example;

// Install the Java helper library from twilio.com/docs/libraries/java
import java.net.URI;
import java.net.URISyntaxException;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.type.PhoneNumber;

public class MakePhoneCall {
    // Get your Account SID and Auth Token from https://twilio.com/console
    // To set up environment variables, see http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("AC1e793338c4ed497174474210f4166f17");
    public static final String AUTH_TOKEN = System.getenv("3ea27196948177dad7c8ef250f1f5e0c");

    public static void main(String[] args) throws URISyntaxException {
        Twilio.init("AC1e793338c4ed497174474210f4166f17", "3ea27196948177dad7c8ef250f1f5e0c");

        String from = "+17706915765";
        String to = "+17705981975";

        Call call = Call.creator(new PhoneNumber(to), new PhoneNumber(from),
                new URI("http://demo.twilio.com/docs/voice.xml")).create();

        System.out.println(call.getSid());
    }
}