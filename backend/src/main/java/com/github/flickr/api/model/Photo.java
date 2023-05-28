package com.github.flickr.api.model;

import com.github.flickr.api.commons.Extras;
import org.scribe.utils.Preconditions;

public class Photo {
    private String id;
    private String owner;
    private String secret;
    private String server;
    private int farm;
    private String title;
    private int isPublic;
    private int isfamily;
    private String urlM;
    private int heightM;
    private int widthM;

    public String getId() {
        return id;
    }

    public String getOwner() {
        return owner;
    }

    public String getSecret() {
        return secret;
    }

    public String getServer() {
        return server;
    }

    public int getFarm() {
        return farm;
    }

    public String getTitle() {
        return title;
    }

    public boolean isPublic() {
        return isPublic == 1;
    }

    public boolean isFamily() {
        return isfamily == 1;
    }

    public String getUrlMedium() {
        Preconditions.checkEmptyString(urlM, "To get this url, you should pass the parameter " + Extras.UrlMedium);
        return urlM;
    }

    public int getHeightMedium() {
        Preconditions.checkEmptyString(urlM, "To get this height, you should pass the parameter " + Extras.UrlMedium);
        return heightM;
    }

    public int getWithMedium() {
        Preconditions.checkEmptyString(urlM, "To get this width, you should pass the parameter " + Extras.UrlMedium);
        return widthM;
    }


    public String getPhotoUrl() {
        // http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
        StringBuilder builder = new StringBuilder("http://farm");
        builder.append(farm)
                .append(".staticflickr.com/")
                .append(server).append("/").append(id).append("_").append(secret).append("jpg");
        return builder.toString();
    }
}
