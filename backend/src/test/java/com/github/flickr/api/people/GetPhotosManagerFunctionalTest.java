package com.github.flickr.api.people;

import com.github.flickr.Flickr;
import com.github.flickr.FlickrBuilder;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

import java.io.IOException;

import static org.fest.assertions.api.Assertions.assertThat;

@Ignore
public class GetPhotosManagerFunctionalTest {

    private static Flickr flickr;

    @BeforeClass
    public static void setUpClass() throws Exception {
        flickr = new FlickrBuilder().withApiKey().build();
    }

    @Test
    public void can_call_flickr() throws IOException {
        GetPhotosRequest request = new GetPhotosRequest(FlickrBuilder.getAccessToken());
        GetPhotosResponse response = flickr.call(request);
        assertThat(response.getStat()).isEqualTo("ok");

    }
}
