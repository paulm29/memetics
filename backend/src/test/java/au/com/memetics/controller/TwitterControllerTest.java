package au.com.memetics.controller;

import au.com.memetics.AbstractTest;
import au.com.memetics.service.SecurityService;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;

import static io.restassured.http.ContentType.JSON;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.given;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class TwitterControllerTest extends AbstractTest {
    @MockBean
    private SecurityService securityService;

    @Test
    public void shouldTweetTextAndImage() throws Exception {
        MockMvcResponse response =
            given().
                contentType(JSON).
                body(withContent("json/tweet_text_and_image.json")).
            when().
                post("/tweets-meme").
            then()
                //.statusCode(200)
            .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    public void shouldTweetTextOnly() {

    }

    @Ignore
    @Test
    @DatabaseSetup({"classpath:dbunit/shouldGetProfile.xml"})
    public void shouldGetStatsRetweets() {
        mockSecurityContext();
        Mockito.when(securityService.canAccess(11)).thenReturn(true);

        MockMvcResponse response =
                when()
                        .get("/rest/oembed-tweet/111")
                        .then()
                        .statusCode(200)
//                        .body("id", is(11))
//                        .body("email", is("profile11@email.com"))
//                        .body("firstName", is("First1"))
//                        .body("lastName", is("Last1"))
//                        .body("nickname", is("nickname1"))
//                        .body("role", is("ROLE_ADMIN"))
//                        .body("socialMediaSignin", is("TWITTER"))
////            .body("createdDate", is(0))
////            .body("modifiedDate", is(0))
//
//                        .body("following.length", hasSize(1))
//                        .body("following.get(0).id", notNullValue())
//                        .body("following.get(0).follower.id", is(11))
//                        .body("following.get(0).following.id", is(13))
//
//                        .body("followers.length", hasSize(1))
//                        .body("followers.get(0).follower.id", is(12))
//                        .body("followers.get(0).following.id", is(11))
                        .extract().response();

        System.out.println(response.getBody().asString());
    }
}