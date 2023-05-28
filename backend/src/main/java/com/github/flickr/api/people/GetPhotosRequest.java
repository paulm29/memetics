package com.github.flickr.api.people;

import com.github.commons.Response;
import com.github.flickr.Flickr;
import com.github.flickr.api.commons.FlickrRequest;
import org.scribe.model.Token;

import java.io.IOException;
import java.util.Map;

public class GetPhotosRequest extends FlickrRequest {

    private String userId = "me";

    public GetPhotosRequest(final Token accessToken) {
        setAccessToken(accessToken);
    }

    @Override
    public Map<String, Object> buildParameters() {
        Map<String, Object> params = emptyParameters("flickr.people.getPhotos");
        params.put("user_id", userId);
        return params;
    }

    @Override
    public boolean isOAuth() {
        return true;
    }

    public void setUserId(String userId) {
        if (userId == null) {
            userId = "me";
        }
        this.userId = userId;
    }

    @Override
    public Response call(final Flickr flickr) throws IOException {
        return flickr.call(this);
    }
}
