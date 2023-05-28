package com.github.imgur;

import org.scribe.model.Token;

import java.util.Map;

public class AccountRequest extends AbstractRequest {
    public AccountRequest(final Token accessToken) {
        setAccessToken(accessToken);
    }

    @Override
    public String requestUrl(final String baseUrl) {
        return baseUrl + "account.json";
    }

    @Override
    public Map<String, Object> buildParameters() {
        return super.emptyParameters();
    }

    @Override
    public boolean isOAuth() {
        return true;
    }
}
