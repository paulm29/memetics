package com.github.imgur;

import com.github.imgur.model.Image;
import com.github.imgur.model.ImageProperty;
import com.github.imgur.model.Links;

public class ImageResponse extends AbstractResponse {
    private ImageProperty image = new ImageProperty();

    public Links getLinks() {
        return image.getLinks();
    }

    public Image getImage() {
        return image.getImage();
    }
}
