package au.com.memetics.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ApplicationConfigController {
    private ApplicationConfig applicationConfig;

    public ApplicationConfigController(ApplicationConfig applicationConfig) {
        this.applicationConfig = applicationConfig;
    }

    @GetMapping(path = "/rest/application-config")
    public Map<String, String> getApplicationConfig() {
        Map<String, String> config = new HashMap<>();
        config.put("imgurClientId", applicationConfig.getImgurClientId());
        config.put("twitterConsumerKey", applicationConfig.getTwitterConsumerKey());
        config.put("twitterConsumerSecret", applicationConfig.getTwitterConsumerSecret());
        config.put("bearerToken", applicationConfig.getBearerToken());
        config.put("idle", applicationConfig.getIdle());
        config.put("idleTimeout", applicationConfig.getIdleTimeout());
        config.put("sendTweetsViaScheduler", applicationConfig.getSendTweetsViaScheduler());
        return config;
    }

}