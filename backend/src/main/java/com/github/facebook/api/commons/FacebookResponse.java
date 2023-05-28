package com.github.facebook.api.commons;

import com.github.commons.Response;

public class FacebookResponse implements Response {

    private String rawResponse;

    @Override
    public void setRawResponse(final String rawResponse) {
        this.rawResponse = rawResponse;
    }
}
