package com.github.imgur;

import com.github.commons.Request;
import com.github.commons.RequestProvider;

import org.scribe.model.OAuthRequest;
import org.scribe.model.Token;
import org.scribe.model.Verb;
import org.scribe.oauth.OAuthService;

import java.util.Map;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ImgUrRequestProvider implements RequestProvider {
    static final String IMGUR_BASE_URL = "https://api.imgur.com/3/";
    private final String apiKey;
    private final OAuthService oauth;

    ImgUrRequestProvider(final String apiKey, final OAuthService oauth) {
        this.apiKey = apiKey;
        this.oauth = oauth;
    }

    @Override
    public OAuthRequest createHttpRequest(final Request r) {
        AbstractRequest request = (AbstractRequest) r;
        return new OAuthRequest(request.getVerb(), request.requestUrl(IMGUR_BASE_URL));
    }

    @Override
    public void addRequestParameters(final OAuthRequest httpRequest, final Request r) {
        AbstractRequest request = (AbstractRequest) r;

        Map<String, Object> params = request.buildParameters();
        Verb verb = request.getVerb();

        if (verb != Verb.DELETE) {
            for (Map.Entry<String, Object> p : params.entrySet()) {
                if (verb == Verb.GET) {
                    httpRequest.addQuerystringParameter(p.getKey(), "" + p.getValue());
                } else {
                    httpRequest.addBodyParameter(p.getKey(), "" + p.getValue());
                }
            }
        }
        if (!request.isOAuth() && apiKey != null) {
            if (verb == Verb.GET) {
                httpRequest.addQuerystringParameter("key", apiKey);
            } else {
                httpRequest.addHeader("Authorization", "Client-ID " + apiKey);
            }
        }
    }

    @Override
    public String jsonUpdater(final String response) {
        return response;
    }

    @Override
    public void signRequest(final OAuthRequest httpRequest, final Request r) {
        AbstractRequest request = (AbstractRequest) r;
        Token accessToken = request.getAccessToken();
        if (accessToken == null && request.isOAuth()) {
            throw new IllegalArgumentException("Oops ! You try to access to an resource "
                    + "which need authentication, "
                    + "and you haven't set an "
                    + "access token on your request " + request + ". "
                    + "Please set this token and retry.");
        }
        oauth.signRequest(accessToken, httpRequest);
    }
}
