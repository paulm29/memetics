package au.com.memetics.controller;

import au.com.memetics.AbstractTest;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import org.junit.Test;

import java.net.URISyntaxException;

import static io.restassured.http.ContentType.JSON;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.given;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;
import static org.hamcrest.core.Is.is;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class RegistrationControllerTest extends AbstractTest {
    @Test
    public void shouldRegister() throws URISyntaxException {
        MockMvcResponse response =
                given().
                        contentType(JSON).
                        body(withContent("json/registration/registration_create_not_socialMediaSignin.json")).
                        when().
                        post("/register").
                        then()
                        .statusCode(201)
                        .extract().response();

        System.out.println(response.getBody().asString());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile/shouldGetProfile.xml"})
    public void shouldDuplicateCheckEmail() throws URISyntaxException {
        when().
                get("/email-check?emailAddress=profile11@email.com").
                then()
                .body(is("true"))
                .statusCode(200);

    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile/shouldGetProfile.xml"})
    public void shouldDuplicateCheckNickname() throws URISyntaxException {
        when().
                get("/nickname-check?nickname=nickname1").
                then()
                .body(is("true"))
                .statusCode(200);

    }
}
