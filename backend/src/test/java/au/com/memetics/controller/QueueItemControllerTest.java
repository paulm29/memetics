package au.com.memetics.controller;

import au.com.memetics.AbstractTest;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import org.junit.Test;

import java.net.URISyntaxException;

import static io.restassured.http.ContentType.JSON;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.given;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class QueueItemControllerTest extends AbstractTest {
    @Test
    @DatabaseSetup({"classpath:dbunit/queue_item/shouldGetQueueItem.xml"})
    public void shouldGetQueueItem() {
        MockMvcResponse response =
                when()
                        .get("/rest/profiles/11/queue")
                .then()
                        .statusCode(200)
                        .body("$", hasSize(1))
                        .body("get(0).id", is(3001))
                        .body("get(0).profile.id", is(11))
                        .body("get(0).meme.id", is(1))
                        .body("get(0).content", is("content"))
                        .body("get(0).hashtags", is("hashtags"))
                .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/queue_item/shouldCreateQueueItem.xml"})
    public void shouldCreateQueueItem() throws URISyntaxException {
        MockMvcResponse response =
                given().
                        contentType(JSON).
                        body(withContent("json/queue_item/queue_item_create.json")).
                when().
                        post("/rest/profiles/11/queue").
                then()
                        .statusCode(201)
                        .body("id", notNullValue())
                        .body("meme.id", is(1))
                        .body("profile.id", is(11))
                        .body("content", is("content"))
                        .body("hashtags", is("hashtags"))
                        .body("createdDate", notNullValue())
                        .body("modifiedDate", notNullValue())
                .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/queue_item/shouldDeleteQueueItem.xml"})
    public void shouldDeleteQueueItem() {
        when().
                delete("/rest/profiles/11/queue/3001").
        then()
                .statusCode(204);
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/queue_item/shouldDeleteTextOnlyQueueItem.xml"})
    public void shouldDeleteTextOnlyQueueItem() {
        when().
                delete("/rest/profiles/11/queue/3002").
                then()
                .statusCode(204);
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/queue_item/shouldGetQueueItem.xml"})
    public void shouldUpdateQueueItem() throws URISyntaxException {
        given().
                contentType(JSON).
                body(withContent("json/queue_item/queue_item_update.json")).
                when().
                put("/rest/profiles/11/queue/3001").
                then()
                .statusCode(200);

        MockMvcResponse response =
                when().
                        get("/rest/profiles/11/queue").
                        then()
                        .statusCode(200)
                        .body("$", hasSize(1))
                        .body("get(0).id", notNullValue())
                        .body("get(0).profile.id", is(11))
                        .body("get(0).meme.id", is(1))
                        .body("get(0).content", is("content_update"))
                        .body("get(0).hashtags", is("hashtags_update"))
                        .extract().response();

        System.out.println(response.getBody().asString());
    }
}
