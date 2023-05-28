package au.com.memetics.controller;

import au.com.memetics.AbstractTest;
import org.junit.Test;

import static io.restassured.module.mockmvc.RestAssuredMockMvc.given;
import static org.hamcrest.core.IsNull.notNullValue;

public class ApplicationConfigControllerTest extends AbstractTest {
    @Test
    public void shouldGetApplicationConfig() {
        given().
//                auth().principal(userWithPermission("11", ESL_STUDENTRECORD_VIEW)).
        when().
                get("/rest/application-config").
        then().
                statusCode(200)
                .body("imgurClientId", notNullValue())
                .body("twitterConsumerKey", notNullValue())
                .body("twitterConsumerSecret", notNullValue())
                .body("bearerToken", notNullValue())
                .body("idle", notNullValue())
                .body("idleTimeout", notNullValue());
    }
}
