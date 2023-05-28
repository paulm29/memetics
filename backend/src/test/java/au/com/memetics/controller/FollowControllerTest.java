package au.com.memetics.controller;

import au.com.memetics.AbstractTest;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import org.junit.Ignore;
import org.junit.Test;

import java.net.URISyntaxException;

import static io.restassured.http.ContentType.JSON;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.given;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class FollowControllerTest extends AbstractTest {
    @Ignore
    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/queue_item.xml"})
    public void shouldGetFollows() {
        MockMvcResponse response =
                when()
                        .get("/rest/profiles/11/follows")
                        .then()
                        .statusCode(200)
                        .body("$", hasSize(1))
                        .body("get(0).id", is(1))
                        .body("get(0).profile.id", is(11))
                        .body("get(0).meme.id", is(1))
                        .body("get(0).content", is("content"))
                        .body("get(0).hashtags", is("hashtags"))
                        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow_none.xml", "classpath:dbunit/meme_none.xml"})
    public void shouldCreateFollow() throws URISyntaxException {
        MockMvcResponse response =
                given().
                        contentType(JSON).
                        body(withContent("json/follow/follow_create.json")).
                when().
                        post("/rest/profiles/11/follows").
                then()
                        .statusCode(201)
                        .body("id", notNullValue())
                        .body("follower.id", is(11))
                        .body("following.id", is(12))
                .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/queue_item.xml"})
    public void shouldDeleteFollow() {
        when().
                delete("/rest/profiles/11/follows/1").
        then()
                .statusCode(204);
    }

}
