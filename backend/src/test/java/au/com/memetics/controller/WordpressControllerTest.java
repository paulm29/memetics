package au.com.memetics.controller;

import au.com.memetics.AbstractTest;
import au.com.memetics.dto.PostDto;
import au.com.memetics.service.WordpressService;
import com.afrozaar.wordpress.wpapi.v2.model.Post;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.net.URISyntaxException;

import static io.restassured.http.ContentType.JSON;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.given;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;

public class WordpressControllerTest extends AbstractTest {
    @MockBean
    private WordpressService wordpressService;

    @Ignore
    @Test
    public void shouldGetQueue() {
        MockMvcResponse response =
                when()
                        .get("/rest/profiles/11/queue")
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
    public void shouldCreateWordpressPost() throws URISyntaxException {
        PostDto postDto = PostDto.builder().title("title").excerpt("excerpt").content("content").build();
        Mockito.when(wordpressService.postCreate(postDto)).thenReturn(new Post());

        MockMvcResponse response =
                given().
                        contentType(JSON).
                        body(withContent("json/wordpress/post_create.json")).
                when().
                        post("/rest/posts").
                then()
                        .statusCode(201)
//                        .body("id", notNullValue())
//                        .body("meme.id", is(1))
//                        .body("profile.id", is(11))
//                        .body("content", is("content"))
//                        .body("hashtags", is("hashtags"))
//                        .body("createdDate", notNullValue())
//                        .body("modifiedDate", notNullValue())
                .extract().response();

        System.out.println(response.getBody().asString());
    }
}
