package com.github.imgur.api.album;

import com.github.imgur.ImgUr;
import com.github.imgur.ImgUrBuilder;
import com.github.imgur.AlbumRequest;
import com.github.imgur.AlbumResponse;

import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

import java.io.IOException;

import static org.fest.assertions.api.Assertions.assertThat;

@Ignore
public class AlbumResponseFunctionalTest {
    private static ImgUr imgur;

    @BeforeClass
    public static void setUpClass() {
        imgur = new ImgUrBuilder().withApiKey().build();
    }

    @Test
    public void can_call_imgur() throws IOException {
        AlbumResponse albumResponse = imgur.call(new AlbumRequest("27nLQ"));
        assertThat(albumResponse.getImages().size()).isGreaterThan(5); // today, there is more than 5 pics into this album
    }
}
