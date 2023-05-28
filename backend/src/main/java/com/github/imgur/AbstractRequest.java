package com.github.imgur;

import com.github.commons.Request;
import org.scribe.model.Token;
import org.scribe.model.Verb;

import java.util.HashMap;
import java.util.Map;

import lombok.ToString;

@ToString
public abstract class AbstractRequest implements Request {

    private Token accessToken;

    public Token getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(final Token accessToken) {
        this.accessToken = accessToken;
    }

    public abstract String requestUrl(String baseUrl);

    public Verb getVerb() {
        return Verb.POST;
    }

    public Map<String, Object> emptyParameters() {
        return new HashMap<String, Object>();
    }

}