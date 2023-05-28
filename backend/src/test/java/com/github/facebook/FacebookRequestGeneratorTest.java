package com.github.facebook;

import com.github.facebook.api.albums.AlbumsRequest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.scribe.model.OAuthRequest;
import org.scribe.oauth.OAuthService;

import static org.fest.assertions.api.Assertions.assertThat;

/**
 * User: Wursteisen David
 * Date: 22/04/12
 * Time: 18:38
 */
@RunWith(MockitoJUnitRunner.class)
public class FacebookRequestGeneratorTest {

    @Mock
    private OAuthService oauth;

    @InjectMocks
    private FacebookRequestProvider generator;

    @Test
    public void can_create_http_request_with_me_as_user_id() {
        OAuthRequest request = generator.createHttpRequest(new AlbumsRequest());
        assertThat(request.getCompleteUrl()).isEqualTo("https://graph.facebook.com/me/albums");
    }

    @Test
    public void can_create_http_request_with_other_user_id() {
        AlbumsRequest facebookRequest = new AlbumsRequest();
        facebookRequest.setUserId("azerty");
        OAuthRequest request = generator.createHttpRequest(facebookRequest);
        assertThat(request.getCompleteUrl()).isEqualTo("https://graph.facebook.com/azerty/albums");
    }
}
