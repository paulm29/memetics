package au.com.memetics.controller;

import au.com.memetics.AbstractTest;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import org.junit.Ignore;
import org.junit.Test;

import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.hamcrest.core.Is.is;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class TagControllerTest extends AbstractTest {
    @Test
    @DatabaseSetup("classpath:dbunit/profile.xml")
    @DatabaseSetup("classpath:dbunit/meme.xml")
    public void shouldGetAllTags() {
        when()
                .get("/rest/tags")
        .then()
                .statusCode(200)
                .body("$", hasSize(4));
    }

    @Test
    public void shouldGet404() {
        when()
                .get("/rest/tags/666")
        .then()
                .statusCode(404);
    }

    @Test
    @DatabaseSetup("classpath:dbunit/profile.xml")
    @DatabaseSetup("classpath:dbunit/meme.xml")
    public void shouldGetTag() {
        when()
                .get("/rest/tags/1")
        .then()
                .statusCode(200)
                .body("id", is(1));
    }

    @Ignore
    @Test
    public void shouldCreateTag() {
    }

    @Ignore
    @Test
    public void shouldUpdateTag() {
    }

    @Ignore
    @Test
    public void shouldDeleteTag() {
    }

    @Test
    @DatabaseSetup("classpath:dbunit/profile.xml")
    @DatabaseSetup("classpath:dbunit/meme.xml")
    public void shouldGetStats() {
        MockMvcResponse response =
                when()
                        .get("/rest/tags/stats")
                .then()
                        .statusCode(200)
                        .body("$", hasSize(3))
                        .body("get(0).tagId", is(1))
                        .body("get(0).text", is("atag"))
                        .body("get(0).weight", is(1))
                        .body("get(1).tagId", is(2))
                        .body("get(1).text", is("atag_subcategory"))
                        .body("get(1).weight", is(1))
                        .extract().response();

        System.out.println(response.getBody().asString());
    }
}
