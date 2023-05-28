package com.github.commons;

import com.google.gson.Gson;
import org.scribe.model.OAuthRequest;

import java.io.IOException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RequestManager {
    private final Gson gson = new Gson();
    private final RequestProvider provider;

    public RequestManager(final RequestProvider provider) {
        this.provider = provider;
    }

    public <RESPONSE extends Response> RESPONSE call(final Request request, final Class<RESPONSE> clazz) throws IOException {
        org.scribe.model.Response response = performHttpRequest(request);

        String responseBody = response.getBody();
        if (!response.isSuccessful()) {
            log.error(Integer.toString(response.getCode()));
            log.error(response.getMessage());
            log.error(response.toString());

            throw new IOException("Oops ! Problem occur with your request " + request.toString()
                    + " ! The called webservice respond with " + responseBody);
        }
        String json = provider.jsonUpdater(responseBody);

        return createObjectResponse(json, clazz);
    }

    public <RESPONSE extends Response> RESPONSE createObjectResponse(final String json, final Class<RESPONSE> clazz) throws IOException {
        RESPONSE responseObject = gson.fromJson(json, clazz);
        if (responseObject == null) {
            throw new IOException("Oops ! Unable to desezialize response " + json
                    + " from your request. Check the validity of your request !");
        }
        responseObject.setRawResponse(json);

        return responseObject;
    }

    private org.scribe.model.Response performHttpRequest(final Request request) {
        OAuthRequest httpRequest = provider.createHttpRequest(request);
        provider.addRequestParameters(httpRequest, request);

        if (request.isOAuth()) {
            provider.signRequest(httpRequest, request);
        }

        return httpRequest.send();
    }


}
