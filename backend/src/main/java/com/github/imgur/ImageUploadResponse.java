package com.github.imgur;

import static java.util.stream.Collectors.toMap;

import java.util.Arrays;
import java.util.Map;
import lombok.ToString;

@ToString
public class ImageUploadResponse extends AbstractResponse {

    /*
    {id=vXXlOYH, title=null, description=null, datetime=1.488701926E9, type=image/jpeg, animated=false, width=500.0, height=623.0, size=88960.0, views=0.0, bandwidth=0.0, vote=null,
    favorite=false, nsfw=null, section=null, account_url=null, account_id=0.0, is_ad=false, tags=[], in_gallery=false, deletehash=5l9I4XUHBFzmmo4, name=, link=http://i.imgur.com/vXXlOYH.jpg}
     */
    private Object data;
    private boolean success;
    private int status;

    private Map<String, String> dataMap;

    public Map<String, String> getDataMap() {
        String input = data.toString();
        Map<String, String> map = Arrays.stream(input.split(", "))
                .map(s -> s.split("="))
                .collect(toMap(
                        a -> a[0],
                        a -> {
                            return a.length > 1 ? a[1] : "";
                        }
                ));

        return map;
    }

    public String getLink() {
        String link = getDataMap().get("link");
        return link.substring(0, link.length() - 1); // strip }
    }

    public String getDeleteHash() {
        return ImgUrRequestProvider.IMGUR_BASE_URL + "image/" + getDataMap().get("deletehash");
    }

//    deletehash=5l9I4XUHBFzmmo4, name=, link=http://i.imgur.com/vXXlOYH.jpg

    /*
    {
    "upload": {
        "image": {
            "name": false,
            "title": "",
            "caption": "",
            "hash": "cSNjk",
            "deletehash": "ZnKGru1reZKoabU",
            "datetime": "2010-08-16 22:43:22",
            "type": "image\/jpeg",
            "animated": "false",
            "width": 720,
            "height": 540,
            "size": 46174,
            "views": 0,
            "bandwidth": 0
        },
        "links": {
            "original": "http:\/\/imgur.com\/cSNjk.jpg",
            "imgur_page": "http:\/\/imgur.com\/cSNjk",
            "delete_page": "http:\/\/imgur.com\/delete\/ZnKGru1reZKoabU",
            "small_square": "http:\/\/imgur.com\/cSNjks.jpg",
            "large_thumbnail": "http:\/\/imgur.com\/cSNjkl.jpg"
        }
    }
}
     */

    /*
    https://api.imgur.com/endpoints/image
    https://api.imgur.com/models/basic
    {
    "data"    : true,
    "status"  : 200,
    "success" : true
     */

//    private ImageProperty upload = new ImageProperty();
//
//    public Links getLinks() {
//        return upload.getLinks();
//    }
//
//
//    public Image getImage() {
//        return upload.getImage();
//    }

//    @Override
//    public String toString() {
//        return "{upload : delete links " + getLinks().getDeletePage() + " }";
//    }
}
