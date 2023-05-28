package au.com.memetics.controller;

import au.com.memetics.AbstractTest;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import org.junit.Test;
import org.springframework.transaction.annotation.Transactional;

import java.net.URISyntaxException;

import static io.restassured.http.ContentType.JSON;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.given;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class CommentControllerTest extends AbstractTest {
    @Test
    @DatabaseSetup({"classpath:dbunit/comment/shouldGetAllComments.xml"})
    public void shouldGetAllComments() {
        MockMvcResponse response =
                when()
                        .get("/rest/memes/1/comments")
                        .then()
                        .statusCode(200)
                        .body("$", hasSize(1))
                        .body("get(0).id", is(111))
                        .body("get(0).profile.id", is(11))
                        .body("get(0).memeId", is(1))
//                .body("get(0).meme.id", is(1))
//                .body("get(1).id", is(112))
//                .body("get(1).profile.id", is(12))
//                .body("get(1).memeId", is(1))
//                .body("get(1).meme.id", is(1))
                        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/comment/shouldGetCommentsForProfile.xml"})
    public void shouldGetCommentsForProfile() {
        MockMvcResponse response =
                when().
                        get("/rest/profiles/comments")
                        .then()
                        .statusCode(200)
                        .body("$", hasSize(1))
                        .body("get(0).id", is(111))
                        .body("get(0).profile.id", is(11))
                        .body("get(0).memeId", is(1))
//                .body("get(0).meme.id", is(1))
                        .body("get(0).commentText", is("a comment"))
                        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/comment/shouldGetComment.xml"})
    public void shouldGetComment() {
        MockMvcResponse response =
                when()
                        .get("/rest/memes/1/comments/111")
                        .then()
                        .statusCode(200)
                        .body("id", is(111))
                        .body("profile.id", is(11))
//            .body("meme.id", is(1))
                        .body("memeId", is(1))
                        .body("commentText", is("a comment"))
                        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    public void shouldGet404() {
        when()
                .get("/rest/memes/1/comments/666")
                .then()
                .statusCode(404);
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/comment/shouldCreateComment.xml"})
    public void shouldCreateComment() throws URISyntaxException {
        MockMvcResponse response =
                given().
                        contentType(JSON).
                        body(withContent("json/comment_create.json")).
                        when().
                        post("/rest/memes/1/comments").
                        then()
                        .statusCode(201)
                        .body("id", notNullValue())
//                        .body("meme.id", is(1))
                        .body("memeId", is(1))
                        .body("profile.id", is(11))
                        .body("commentText", is("new comment"))
                        .body("createdDate", notNullValue())
                        .body("modifiedDate", notNullValue())
                        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldUpdateComment() throws URISyntaxException {
        given().
                contentType(JSON).
                body(withContent("json/comment_update.json")).
                when().
                put("/rest/memes/1/comments/111").
                then()
                .statusCode(200);

        MockMvcResponse response =
                when().
                        get("/rest/memes/1/comments/111").
                        then()
                        .statusCode(200)
                        .body("id", is(111))
                        .body("memeId", is(1))
//                .body("meme.id", is(1))
                        .body("profile.id", is(11))
                        .body("commentText", is("updated comment"))
//                .body("createdDate", notNullValue())
                        .body("modifiedDate", notNullValue())
                        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @Transactional
    @DatabaseSetup({"classpath:dbunit/comment/shouldDeleteComment.xml"})
    public void shouldDeleteComment() {
        when().
                delete("/rest/memes/1/comments/111").
                then()
                .statusCode(204);
    }
}
