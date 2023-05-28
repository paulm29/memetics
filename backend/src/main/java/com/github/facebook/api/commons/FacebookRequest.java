package com.github.facebook.api.commons;

import com.github.commons.Request;
import org.scribe.model.Token;

import java.util.HashMap;
import java.util.Map;

public abstract class FacebookRequest implements Request {

    public static final String ME_AS_USER_ID = "me";

    private String userId = ME_AS_USER_ID;

    public String getUserId() {
        return userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }

    public void setMeAsUserId() {
        setUserId(ME_AS_USER_ID);
    }

    public abstract String requestUrl(String baseUrl);

    private Token accessToken;

    public Token getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(final Token accessToken) {
        this.accessToken = accessToken;
    }


    protected Map<String, Object> emtpyParameters() {
        return new HashMap<String, Object>();
    }

    @Override
    public Map<String, Object> buildParameters() {
        return emtpyParameters();
    }

    @Override
    public boolean isOAuth() {
        return true;
    }
}
