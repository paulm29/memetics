package com.github.imgur;

import java.util.Map;

import org.scribe.model.Verb;

public class ImageDeleteRequest extends AbstractRequest {
    private String hash;

    public ImageDeleteRequest(final String hash) {
        this.hash = hash;
    }

    @Override
    public String requestUrl(String baseUrl) {
        return hash; // note: no baseurl required
    }

    public Map<String, Object> buildParameters() {
        return emptyParameters();
    }

    @Override
    public boolean isOAuth() {
        return (getAccessToken() != null);
    }

    @Override
    public Verb getVerb() {
        return Verb.DELETE;
    }
}
