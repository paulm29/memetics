package au.com.memetics.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import static org.springframework.http.HttpStatus.CREATED;

@Tag(name = "wordpress", description = "Operations with buffer")
@RestController
@RequestMapping("/rest")
@Slf4j
public class MindsController {
    // https://stackoverflow.com/questions/27864295/how-to-use-oauth2resttemplate
    // http://sivatechlab.com/create-rest-client-spring/

    // https://www.baeldung.com/rest-template


//    username
//    password

//            'cookie': 'loggedin=1; minds=' + c['minds'] + '; XSRF-TOKEN=' + c['XSRF-TOKEN'],
//    x-xsrf-token

//    https://www.minds.com/api/v1/authenticate
//
//    https://www.minds.com/api/v1/newsfeed
//
//
//    "https://www.minds.com/api/v1/channel/" + name;


    @GetMapping("/template")
    public String getObject() {
        RestTemplate restTemplate = new RestTemplate();
        String fooResourceUrl = "http://localhost:8080/spring-rest/foos";
//        ResponseEntity<String> response
//                = restTemplate.getForEntity(fooResourceUrl + "/1", String.class);


//        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));

//        ObjectMapper mapper = new ObjectMapper();
//        JsonNode root = mapper.readTree(response.getBody());
//        JsonNode name = root.path("name");

//        return response.getBody();

        String foo = restTemplate
                .getForObject(fooResourceUrl + "/1", String.class);
        return foo;
    }

    @PostMapping("/template")
    @ResponseStatus(CREATED)
    public String createObject() {
        String fooResourceUrl = "fooResourceUrl";
        ClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        RestTemplate restTemplate = new RestTemplate(requestFactory);

        HttpEntity<String> request = new HttpEntity<>(new String("bar"));
        String foo = restTemplate.postForObject(fooResourceUrl, request, String.class);
        return foo;
//        assertThat(foo, notNullValue());
//        assertThat(foo.getName(), is("bar"));


//        HttpEntity<Foo> request = new HttpEntity<>(new Foo("bar"));
//        URI location = restTemplate
//                .postForLocation(fooResourceUrl, request);
//        assertThat(location, notNullValue());

//        ResponseEntity<Foo> response = restTemplate
//                .exchange(fooResourceUrl, HttpMethod.POST, request, Foo.class);
//
//        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
//
//        Foo foo = response.getBody();
    }

//    @PostMapping("/template")
//    @ResponseStatus(CREATED)
//    public String postForm() {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
//
//        MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
//        map.add("id", "1");
//
////        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
////        ResponseEntity<String> response = restTemplate.postForEntity(
////                fooResourceUrl+"/form", request , String.class);
//
////        assertThat(response.getStatusCode(), is(HttpStatus.CREATED));
//
//
//    }
}
