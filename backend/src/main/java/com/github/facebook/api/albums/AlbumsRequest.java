package com.github.facebook.api.albums;

import com.github.facebook.api.commons.FacebookRequest;

public class AlbumsRequest extends FacebookRequest {

    @Override
    public String requestUrl(final String baseUrl) {
        return baseUrl + "/albums";
    }
}
