package com.github.flickr.api.collections;

import com.github.commons.Response;
import com.github.flickr.Flickr;
import com.github.flickr.api.commons.FlickrRequest;

import java.io.IOException;
import java.util.Map;

public class GetTreeRequest extends FlickrRequest {
    private String collectionId;
    private String userId;


    @Override
    public Response call(final Flickr flickr) throws IOException {
        return flickr.call(this);
    }

    @Override
    public Map<String, Object> buildParameters() {
        final Map<String, Object> params = emptyParameters("flickr.collections.getTree");
        if (collectionId != null) {
            params.put("collection_id", collectionId);
        }
        if (userId != null) {
            params.put("user_id", userId);
        }
        return params;
    }

    @Override
    public boolean isOAuth() {
        return false;
    }

    public void setCollectionId(final String collectionId) {
        this.collectionId = collectionId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }
}
