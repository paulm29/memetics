package au.com.memetics.controller;

import static io.restassured.module.mockmvc.RestAssuredMockMvc.given;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;

import java.net.URISyntaxException;

import io.restassured.module.mockmvc.response.MockMvcResponse;
import org.junit.Test;

import io.restassured.response.Response;

import com.github.springtestdbunit.annotation.DatabaseSetup;
import au.com.memetics.AbstractTest;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class HashtagFavouriteTest extends AbstractTest {
    @Test
    @DatabaseSetup({"classpath:dbunit/hashtag_favourite/shouldCreateFavourite.xml"})
    public void shouldCreateFavourite() throws URISyntaxException {
        MockMvcResponse response =
        given().
                contentType(JSON).
                body(withContent("json/hashtag_favourite/hashtag_favourite_create.json")).
        when().
                post("/rest/profiles/11/hashtag-favourites").
        then()
                .statusCode(201)
                .body("id", notNullValue())
                .body("profile.id", is(11))
                .body("hashtag", is("xyz"))
        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/hashtag_favourite/shouldDeleteFavourite.xml"})
    public void shouldDeleteFavourite() {
        when().
            delete("/rest/profiles/11/hashtag-favourites/1").
        then()
            .statusCode(204);

        MockMvcResponse response =
        when().
                get("/rest/profiles/11").
        then()
                .statusCode(200)
                .body("hashtagFavourites", hasSize(0))
        .extract().response();

        System.out.println(response.getBody().asString());
    }
}
