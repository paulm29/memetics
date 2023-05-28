package com.github.imgur;

import java.util.Map;


public class ImageRequest extends AbstractRequest {
    private String hash;

    public ImageRequest(final String hash) {
        this.hash = hash;
    }

    public Map<String, Object> buildParameters() {
        return emptyParameters();
    }

    @Override
    public boolean isOAuth() {
        return false;
    }

    @Override
    public String requestUrl(final String baseUrl) {
        return baseUrl + "image/" + hash + ".json";
    }
}
