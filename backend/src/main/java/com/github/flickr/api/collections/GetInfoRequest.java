package com.github.flickr.api.collections;

import com.github.commons.Response;
import com.github.flickr.Flickr;
import com.github.flickr.api.commons.FlickrRequest;

import java.io.IOException;
import java.util.Map;

public class GetInfoRequest extends FlickrRequest {

    private final String collectionId;

    public GetInfoRequest(final String collectionId) {
        this.collectionId = collectionId;
    }

    @Override
    public Response call(final Flickr flickr) throws IOException {
        return flickr.call(this);
    }

    @Override
    public Map<String, Object> buildParameters() {
        final Map<String, Object> parameters = emptyParameters("flickr.collections.getInfo");
        parameters.put("collection_id", collectionId);
        return parameters;
    }

    @Override
    public boolean isOAuth() {
        return false;
    }
}
