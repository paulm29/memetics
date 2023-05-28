package com.github.flickr.api.test;

import com.github.flickr.Flickr;
import com.github.flickr.FlickrBuilder;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import java.io.IOException;

import static org.fest.assertions.api.Assertions.assertThat;

@Ignore
public class EchoManagerFunctionalTest {

    private Flickr flickr;

    @Before
    public void setUp() throws IOException {
        flickr = new FlickrBuilder().withApiKey().build();
    }

    @Test
    public void can_call_flickr() throws IOException {
        EchoResponse response = flickr.call(new EchoRequest());
        assertThat(response.getStat()).isEqualTo("ok");
    }

    @Test
    public void can_call_flickr_with_custom_parameter() throws IOException {
        EchoRequest request = new EchoRequest();
        request.setTestParameter("MyFakeParameter");
        EchoResponse response = flickr.call(request);
        assertThat(response.getTestParameter()).isEqualTo("MyFakeParameter");
    }
}
