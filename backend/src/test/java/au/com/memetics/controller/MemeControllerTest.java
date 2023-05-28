package au.com.memetics.controller;

import au.com.memetics.AbstractTest;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import org.apache.commons.lang3.StringUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import java.net.URISyntaxException;

import static io.restassured.http.ContentType.JSON;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.given;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;
import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.junit.Assert.assertTrue;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class MemeControllerTest extends AbstractTest {
    @Test
    @WithMockUser
    @DatabaseSetup({"classpath:dbunit/meme/shouldGetMeme.xml"})
    public void shouldGetMeme() {
        MockMvcResponse response =
        given().
                auth().principal(userWithPermission()).
        when().
                get("/rest/memes/1").
        then()
                .statusCode(200)
                .body("id", is(1))
                .body("profile.id", is(11))
                .body("title", is("title1"))
                .body("url", is("http://"))
//                .body("createdDate", is(0))
                .body("credits", is("credits1"))
                .body("caption", is("caption1"))
                .body("originalContent", is(false))
//                .body("comments", hasSize(2))
//                .body("votes", hasSize(2))
//                .body("tags", hasSize(3))
        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/meme/shouldGet404.xml"})
    public void shouldGet404() {
        when().
                get("/rest/memes/9999").
        then()
                .statusCode(404);
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/meme/shouldCreateMeme.xml"})
    public void shouldCreateMeme() throws Exception {
        MockMvcResponse response =
        given().
                contentType(JSON).
                body(withContent("json/meme_create.json")).
        when().
                post("/rest/memes").
        then()
                .statusCode(201)
                .body("profile.id", is(11))
                .body("title", is("title"))
                .body("url", is("http://"))
                .body("createdDate", notNullValue())
                .body("credits", is("credits"))
                .body("caption", is("caption"))
                .body("originalContent", is(true))
                .body("tags", hasSize(2))
                .body("tags.name", hasItems("atag", "btag"))
        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/meme/shouldCreateMemeWithExistingTag.xml"})
//    @DatabaseTearDown({"classpath:dbunit/meme/clearMeme.xml"})
    public void shouldCreateMemeWithExistingTag() throws Exception {
        MockMvcResponse response =
        given().
                contentType(JSON).
                body(withContent("json/meme_create_existing_tag.json")).
        when().
                post("/rest/memes").
        then()
                .statusCode(201)
                .body("profile.id", is(11))
                .body("title", is("title"))
                .body("url", is("http://"))
                .body("createdDate", notNullValue())
                .body("credits", is("credits"))
                .body("caption", is("caption"))
                .body("originalContent", is(false))
                .body("tags", hasSize(1))
                .body("tags.name", hasItems("atag"))
        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/meme/shouldUpdateMeme.xml"})
    public void shouldUpdateMeme() throws URISyntaxException {
        given().
                contentType(JSON).
                body(withContent("json/meme_update.json")).
        when().
                put("/rest/memes/1").
        then()
                .statusCode(200);

        when().
                get("/rest/memes/1").
        then()
                .statusCode(200)
                .body("profile.id", is(11))
                .body("title", is("title"))
                .body("url", is("http://"))
//                .body("createdDate", is(1))
                .body("modifiedDate", notNullValue())
                .body("credits", is("credits"))
                .body("caption", is("caption"))
                .body("originalContent", is(false))
                .body("tags", hasSize(2))
                .body("tags.name", hasItems("atag", "ctag"));
    }

    @Test // will delete meme, entry in join table, and tag - if tag is not used by other meme
    @DatabaseSetup("classpath:dbunit/meme/shouldDeleteMeme.xml")
    public void shouldDeleteMeme() {
        when().
                delete("/rest/memes/2001").
        then()
                .statusCode(204);
    }

    @Ignore
    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldExportLearner() {
        MockMvcResponse response =
                when()
                        .get("/rest/memes/export")
                        .then()
                        .statusCode(200)
                        .contentType("text/csv")
                        .extract().response();
        String actual = StringUtils.trimToNull(response.getBody().asString());
        String header = "id,createdDate,nickname,credits,title,caption,url";
        String content = "1,01/01/1970,nickname1,credits1,title1,caption1,http://";

        assertTrue(actual.contains(header));
        assertTrue(actual.contains(content));

        System.out.println(actual);
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldGetMemeByMultipleSearchCriteria() {
        MockMvcResponse response =
        given().
                param("profileId", "11").
                param("myMemes", "true").
                param("nickname", "nickname1").
                param("title", "title1").
                param("credits", "credits1").
                param("tagList", "atag,btag").
        when()
                .get("/rest/memes").
        then().
                statusCode(200)
                .body("results", hasSize(1))
                .body("results.get(0).profile.id", is(11))
                .body("results.get(0).title", is("title1"))
                .body("results.get(0).url", is("http://"))
//                .body("results.get(0).createdDate", is(0))
                .body("results.get(0).modifiedDate", notNullValue())
                .body("results.get(0).credits", is("credits1"))
                .body("results.get(0).caption", is("caption1"))
                .body("results.get(0).originalContent", is(false))
                .body("results.get(0).tags", hasSize(3))
                .body("results.get(0).tags.name", hasItems("atag", "btag"))
        .extract().response();

        System.out.println(response.getBody().asString());
    }
}
