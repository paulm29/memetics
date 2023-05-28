package com.github.imgur.api.image;

import com.github.imgur.ImageResponse;
import com.github.imgur.ImgUr;
import com.github.imgur.ImgUrBuilder;
import com.github.imgur.ImageRequest;

import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

import java.io.IOException;

import static org.fest.assertions.api.Assertions.assertThat;

@Ignore
public class ImageManagerFunctionalTest {

    private static ImgUr imgur;

    @BeforeClass
    public static void setUpClass() {
        imgur = new ImgUrBuilder().withApiKey().build();
    }

    @Test
    public void can_call_imgur() throws IOException {
        ImageResponse result = imgur.call(new ImageRequest("ABktn"));
        assertThat(result.getImage().getDatetime()).isEqualTo("2010-08-31 12:10:40");
    }

    @Test(expected = IOException.class)
    public void cant_ask_fake_image() throws IOException {
        final String hash = "FAKE";
        imgur.call(new ImageRequest(hash));
    }

}
