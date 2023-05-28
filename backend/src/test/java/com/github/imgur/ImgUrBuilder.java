package com.github.imgur;

import com.github.commons.Builder;

public class ImgUrBuilder extends Builder<ImgUr> {

    private String anonymousKey = null;

    public ImgUrBuilder() {
        super("imgur.apikey", "imgur.secret");
    }

    public ImgUrBuilder withAnonymousKey() {
        anonymousKey = getProperty("imgur.anonymous.apikey");
        return this;
    }

    @Override
    public ImgUr build() {
        if (anonymousKey != null) {
            return new ImgUr(anonymousKey);
        }
        return new ImgUr(getApiKey(), getSecret());
    }
}
