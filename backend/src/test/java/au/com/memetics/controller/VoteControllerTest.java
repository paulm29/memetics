package au.com.memetics.controller;

import au.com.memetics.AbstractTest;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import org.junit.Ignore;
import org.junit.Test;

import static io.restassured.http.ContentType.JSON;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.given;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;
import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsNull.notNullValue;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class VoteControllerTest extends AbstractTest {
    @Test
    @DatabaseSetup({"classpath:dbunit/vote/shouldGetVote.xml"})
    public void shouldGetVote() {
        MockMvcResponse response =
        when()
                .get("/rest/votes/1")
        .then()
                .statusCode(200)
                .body("id", is(1))
                .body("memeId", is(1))
                .body("profileId", is(11))
                .body("score", is(1))
        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    public void shouldGet404() {
        when()
                .get("/rest/votes/666")
        .then()
                .statusCode(404);
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/shouldCreateVote.xml"})
    public void shouldCreateVote() throws Exception {
        MockMvcResponse response =
                given().
                        contentType(JSON).
                        body(withContent("json/vote_create.json")).
                when().
                        post("/rest/votes").
                then()
                        .statusCode(201)
                        .body("id", notNullValue())
                        .body("memeId", is(1))
                        .body("profileId", is(11))
                        .body("score", is(0))
                .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/vote/shouldUpdateVote.xml"})
    public void shouldUpdateVote() throws Exception {
        given().
                contentType(JSON).
                body(withContent("json/vote_update.json")).
        when().
                put("/rest/votes/1").
        then()
                .statusCode(200);

        when().
                get("/rest/votes/1").
        then()
                .statusCode(200)
                .body("id", is(1))
                .body("memeId", is(1))
                .body("profileId", is(11))
                .body("score", is(-1));
    }

    @Ignore
    @Test
    public void shouldDeleteVote() {
    }
}
