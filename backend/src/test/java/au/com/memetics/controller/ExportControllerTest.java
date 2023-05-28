package au.com.memetics.controller;

import au.com.memetics.AbstractTest;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import io.restassured.module.mockmvc.response.MockMvcResponse;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;

import static io.restassured.module.mockmvc.RestAssuredMockMvc.when;
import static org.junit.Assert.assertTrue;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class ExportControllerTest extends AbstractTest {
    @Test
    @DatabaseSetup({"classpath:dbunit/export/shouldExportLearner.xml"})
    public void shouldExportLearner() {

        MockMvcResponse response =
                when()
                        .get("/meme-export")
                .then()
                        .statusCode(200)
                        .contentType("text/csv")
                        .extract().response();

        String actual = StringUtils.trimToNull(response.getBody().asString());
        String header = "id,createdDate,nickname,credits,title,caption,url";
        String content = "1,01/01/1970,nickname1,credits1,title1,caption1,http://";

        System.out.println(actual);

        assertTrue(actual.contains(header));
        assertTrue(actual.contains(content));
    }
}