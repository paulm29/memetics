package com.github.imgur;

import com.github.commons.OAuthSupport;
import com.github.commons.RequestManager;

import org.scribe.builder.ServiceBuilder;
import org.scribe.builder.api.ImgUrApi;
import org.scribe.oauth.OAuthService;

import java.io.IOException;

public class ImgUr extends OAuthSupport {
    private final ImgUrRequestProvider requestGenerator;
    private final RequestManager requestManager;

    public ImgUr(final String apiKey) {
        this(apiKey, (OAuthService) null);
    }

    public ImgUr(final String apiKey, final OAuthService oauth) {
        super(oauth);
        requestGenerator = new ImgUrRequestProvider(apiKey, oauth);
        requestManager = new RequestManager(requestGenerator);
    }

    public ImgUr(final String apiKey, final String secret) {
        this(apiKey, new ServiceBuilder().provider(ImgUrApi.class)
                .apiKey(apiKey)
                .apiSecret(secret)
                .build());
    }

    public AccountResponse call(final AccountRequest request) throws IOException {
        return requestManager.call(request, AccountResponse.class);
    }

    public ImageResponse call(final ImageRequest request) throws IOException {
        return requestManager.call(request, ImageResponse.class);
    }

    public StatsResponseAbstract call(final StatsRequestAbstract request) throws IOException {
        return requestManager.call(request, StatsResponseAbstract.class);
    }

    public ImageUploadResponse call(final ImageUploadRequest request) throws IOException {
        return requestManager.call(request, ImageUploadResponse.class);
    }

    public ImageDeleteResponse call(final ImageDeleteRequest request) throws IOException {
        return requestManager.call(request, ImageDeleteResponse.class);
    }

    public AlbumResponse call(final AlbumRequest request) throws IOException {
        return requestManager.call(request, AlbumResponse.class);
    }
}
