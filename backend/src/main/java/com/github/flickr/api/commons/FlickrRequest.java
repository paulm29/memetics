package com.github.flickr.api.commons;

import com.github.commons.Request;
import com.github.commons.Response;
import com.github.flickr.Flickr;
import org.scribe.model.Token;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public abstract class FlickrRequest implements Request {
    private Token accessToken;

    public Token getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(final Token accessToken) {
        this.accessToken = accessToken;
    }

    public Map<String, Object> emptyParameters(final String method) {
        HashMap<String, Object> params = new HashMap<String, Object>();
        params.put("method", method);
        return params;
    }

    public abstract Response call(Flickr flickr) throws IOException;

}
