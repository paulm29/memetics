package com.github.flickr.api.commons;

import com.github.commons.Response;

public abstract class FlickrResponse implements Response {

    private String raw;

    @Override
    public void setRawResponse(final String rawResponse) {
        this.raw = rawResponse;
    }

    @Override
    public String toString() {
        return this.raw;
    }
}
