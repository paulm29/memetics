package com.github.imgur;

import com.github.imgur.model.ImageProperty;

import java.util.ArrayList;
import java.util.List;

public class AlbumResponse extends AbstractResponse {

    private Album album = new Album();

    private static class Album {
        private String title;
        private String description;
        private String cover;
        private String layout;
        private List<ImageProperty> images;

    }

    public String getTitle() {
        return album.title;
    }

    public String getDescription() {
        return album.description;
    }

    public String getCover() {
        return album.cover;
    }

    public String getLayout() {
        return album.layout;
    }

    public List<ImageProperty> getImages() {
        return new ArrayList<ImageProperty>(album.images);
    }
    /*{
        "album": {
        "title": "Album Title",
                "description": "Album Description",
                "cover": "ix7Yt",
                "layout": "grid",
                "images": [
        {
            "image": {
            "title": null,
                    "caption": null,
                    "hash": "ix7Yt",
                    "datetime": "2012-03-22 21:47:52",
                    "type": "image/png",
                    "animated": "false",
                    "width": 1000,
                    "height": 520,
                    "size": 15827,
                    "views": 0,
                    "bandwidth": 0
        },
            "links": {
            "original": "http://imgur.com/ix7Yt.png",
                    "imgur_page": "http://imgur.com/ix7Yt",
                    "small_square": "http://imgur.com/ix7Yts.jpg",
                    "large_thumbnail": "http://imgur.com/ix7Ytl.jpg"
        }
        }
        ]
    }
    }*/
}
