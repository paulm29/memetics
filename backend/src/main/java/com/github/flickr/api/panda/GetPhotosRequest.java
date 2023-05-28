package com.github.flickr.api.panda;

import com.github.commons.Response;
import com.github.flickr.Flickr;
import com.github.flickr.api.commons.Extras;
import com.github.flickr.api.commons.FlickrRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class GetPhotosRequest extends FlickrRequest {
    private Panda panda;
    private final List<Extras> extras = new ArrayList<Extras>();
    private Integer page;
    private Integer perPage;

    @Override
    public Response call(final Flickr flickr) throws IOException {
        return flickr.call(this);
    }

    @Override
    public Map<String, Object> buildParameters() {
        Map<String, Object> params = emptyParameters("flickr.panda.getPhotos");
        params.put("panda_name", panda.getPandaName());
        if (!extras.isEmpty()) {
            params.put("extras", Extras.commaDelimited(extras));
        }
        if (perPage != null) {
            params.put("per_page", perPage);
        }
        if (page != null) {
            params.put("page", page);
        }
        return params;
    }

    public void setPanda(final Panda panda) {
        this.panda = panda;
    }

    public void setPage(final Integer page) {
        this.page = page;
    }

    public void setPerPage(final Integer perPage) {
        this.perPage = perPage;
    }

    public void addExtras(final Extras... extras) {
        this.extras.addAll(Arrays.asList(extras));
    }

    @Override
    public boolean isOAuth() {
        return false;
    }
}
