package com.github.flickr.api.test;

import com.github.commons.Response;
import com.github.flickr.Flickr;
import com.github.flickr.api.commons.FlickrRequest;
import org.scribe.model.Token;

import java.io.IOException;
import java.util.Map;

public class NullRequest extends FlickrRequest {

    public NullRequest(final Token accesstoken) {
        setAccessToken(accesstoken);
    }

    @Override
    public Response call(final Flickr flickr) throws IOException {
        return flickr.call(this);
    }

    @Override
    public Map<String, Object> buildParameters() {
        return super.emptyParameters("flickr.test.null");
    }

    @Override
    public boolean isOAuth() {
        return true;
    }
}
