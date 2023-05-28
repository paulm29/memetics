package au.com.memetics.controller;

import au.com.memetics.AbstractTest;
import au.com.memetics.service.SecurityService;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithAnonymousUser;

import java.net.URISyntaxException;

import static io.restassured.http.ContentType.JSON;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.given;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.hamcrest.core.Is.is;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class ProfileControllerTest extends AbstractTest {
    @MockBean
    private SecurityService securityService;

    @Test
    @DatabaseSetup({"classpath:dbunit/profile/shouldGetProfile.xml"})
    public void shouldGetProfile() {
        MockMvcResponse response =
        when()
            .get("/rest/profiles/11")
        .then()
            .statusCode(200)
            .body("id", is(11))
            .body("email", is("profile11@email.com"))
            .body("firstName", is("First1"))
            .body("lastName", is("Last1"))
            .body("nickname", is("nickname1"))
            .body("role", is("ROLE_ADMIN"))
            .body("socialMediaSignin", is("TWITTER"))
//            .body("createdDate", is(0))
//            .body("modifiedDate", is(0))

            .body("following.length", hasSize(1))
            .body("following.get(0).id", notNullValue())
            .body("following.get(0).follower.id", is(11))
            .body("following.get(0).following.id", is(13))

            .body("followers.length", hasSize(1))
            .body("followers.get(0).follower.id", is(12))
            .body("followers.get(0).following.id", is(11))
        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Ignore
    @Test
    @WithAnonymousUser
    @DatabaseSetup({"classpath:dbunit/profile.xml"})
    public void shouldAddNewFollowing() throws URISyntaxException {
        Mockito.when(securityService.canAccess(11)).thenReturn(true);

        MockMvcResponse response =
        given().
                contentType(JSON).
                auth().principal(userWithPermission()).
                body(withContent("json/follow/profile_update_add_follow.json")).
        when().
                put("/rest/profiles/11").
        then()
                .statusCode(200)
                .body("id", is(11))
                .body("email", is("profile11@email.com"))
                .body("firstName", is("updated_firstName"))
                .body("lastName", is("updated_lastName"))
                .body("nickname", is("updated_nickname"))
                .body("role", is("ROLE_ADMIN"))
                .body("socialMediaSignin", is("TWITTER"))

                .body("following.length", hasSize(1))
//                .body("following.get(0).id", notNullValue())
//                .body("following.get(0).follower.id", is(11))
//                .body("following.get(0).following.id", is(12))

                .body("followers.length", hasSize(0))
                .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml"})
    public void shouldUpdateFollowing() throws URISyntaxException {
        Mockito.when(securityService.canAccess(11)).thenReturn(true);

        MockMvcResponse response =
        given().
                contentType(JSON).
                auth().principal(mockSecurityContext()).
                body(withContent("json/profile_update.json")).
        when().
                put("/rest/profiles/11").
        then()
                .statusCode(200)
                .body("id", is(11))
                .body("email", is("profile11@email.com"))
                .body("firstName", is("updated_firstName"))
                .body("lastName", is("updated_lastName"))
                .body("nickname", is("updated_nickname"))
                .body("role", is("ROLE_ADMIN"))
                .body("socialMediaSignin", is("TWITTER"))

                .body("following.length", hasSize(2))
                .body("following.get(0).id", is(1))
                .body("following.get(0).follower.id", is(11))
                .body("following.get(0).following.id", is(13))
//                .body("following.get(1).id", notNullValue())
//                .body("following.get(1).follower.id", is(11))
//                .body("following.get(1).following.id", is(13))

                .body("followers.length", hasSize(0))
        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Ignore
    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/hashtag_favourites_none.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme_none.xml"})
    public void shouldRemoveFollowing() throws URISyntaxException {
        Mockito.when(securityService.canAccess(11)).thenReturn(true);

        MockMvcResponse response =
        given().
                contentType(JSON).
                body(withContent("json/follow/profile_delete_following.json")).
        when().
                put("/rest/profiles/11").
        then()
                .statusCode(200)
                .body("id", is(11))
                .body("email", is("profile11@email.com"))
                .body("firstName", is("updated_firstName"))
                .body("lastName", is("updated_lastName"))
                .body("nickname", is("updated_nickname"))
                .body("role", is("ROLE_ADMIN"))
                .body("socialMediaSignin", is("TWITTER"))

                .body("following.length", hasSize(0))
                .body("followers.length", hasSize(0))
        .extract().response();

        System.out.println(response.getBody().asString());

        MockMvcResponse response2 =
        when()
                .get("/rest/profiles/11")
        .then()
                .statusCode(200)
                .body("following.length", hasSize(1))
                .body("followers.length", hasSize(1))
        .extract().response();

        String body = response2.getBody().asString();
        System.out.println(body);
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile/shouldDeleteProfile.xml"})
    public void shouldDeleteProfile() {
        when()
                .delete("/rest/profiles/11")
        .then()
                .statusCode(204);
    }

    @Test
    public void shouldGet404() {
        when()
            .get("/rest/profiles/666")
        .then()
            .statusCode(404);
    }

//      // TODO how to mock
//Caused by: java.lang.IllegalStateException: Unable to get a ConnectionRepository: no user signed in
//    at org.springframework.social.security.AuthenticationNameUserIdSource.getUserId(AuthenticationNameUserIdSource.java:31)
//    at org.springframework.social.config.annotation.SocialConfiguration.connectionRepository(SocialConfiguration.java:101)

    @Ignore
    @Test
    @DatabaseSetup({"classpath:dbunit/profile_only.xml"})
    public void shouldGetStatsRetweets() throws Exception {
        MockMvcResponse response =
//        given()
//                .auth().oauth2("drmobutu@gmail.com").
                when()
                        .get("/rest/profiles/11/stats-retweets")
                        .then()
                        .statusCode(200)
                        .extract().response();

        System.out.println(response.getBody().asString());
    }
}
