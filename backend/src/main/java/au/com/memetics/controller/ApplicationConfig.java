package au.com.memetics.controller;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class ApplicationConfig {
    @Value("${imgurClientId:imgurClientId}")
    private String imgurClientId;

    @Value("${twitterConsumerKey:twitterConsumerKey}")
    private String twitterConsumerKey;

    @Value("${twitterConsumerSecret:twitterConsumerSecret}")
    private String twitterConsumerSecret;

    @Value("${bearerToken:bearerToken}")
    private String bearerToken;

    @Value("${idle:idle}")
    private String idle;

    @Value("${idleTimeout:idleTimeout}")
    private String idleTimeout;

    @Value("false")
    private String sendTweetsViaScheduler;

    public boolean isSendTweetsViaScheduler() {
        return Boolean.parseBoolean(sendTweetsViaScheduler);
    }
}
