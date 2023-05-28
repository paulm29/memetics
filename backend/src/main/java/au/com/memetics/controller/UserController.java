package au.com.memetics.controller;

import au.com.memetics.entity.Profile;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@Slf4j
@Tag(name = "user", description = "Access the user")
public class UserController {

    @GetMapping(path = "user", produces = APPLICATION_JSON_VALUE)
    @Operation(summary = "Retrieve logged in user")
    public ResponseEntity<?> getUser(final Authentication authentication) {

        if (Objects.nonNull(authentication)) {
            log.info(authentication.getName() + " logging in.");
            return new ResponseEntity<>((Profile) authentication.getPrincipal(), HttpStatus.OK);
        } else {
            Profile dummy = new Profile();
            dummy.setEmail("dummy");
            return new ResponseEntity<>(dummy, HttpStatus.OK);
        }
    }
}
