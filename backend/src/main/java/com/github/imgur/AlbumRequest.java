package com.github.imgur;

import java.util.Map;

public class AlbumRequest extends AbstractRequest {

    private final String hash;

    public AlbumRequest(final String hash) {
        this.hash = hash;
    }

    @Override
    public String requestUrl(final String baseUrl) {
        return baseUrl + "album/" + hash + ".json";
    }

    @Override
    public Map<String, Object> buildParameters() {
        return emptyParameters();
    }

    @Override
    public boolean isOAuth() {
        return false;
    }
}
