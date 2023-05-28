package com.github.commons;

import org.scribe.model.Token;
import org.scribe.model.Verifier;
import org.scribe.oauth.OAuthService;


public class OAuthSupport {
    protected final OAuthService oauth;

    public OAuthSupport(final OAuthService oauthService) {
        this.oauth = oauthService;
    }

    public Token getRequestToken() {
        return oauth.getRequestToken();
    }

    public String getAuthorizationUrl(final Token requestToken) {
        return oauth.getAuthorizationUrl(requestToken);
    }

    public Token getAccessToken(final Token requestToken, final Verifier verifier) {
        return oauth.getAccessToken(requestToken, verifier);
    }
}
