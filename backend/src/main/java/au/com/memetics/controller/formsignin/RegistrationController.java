package au.com.memetics.controller.formsignin;

import au.com.memetics.controller.exception.NotFoundException;
import au.com.memetics.entity.Profile;
import au.com.memetics.entity.ProfileSearchCriteria;
import au.com.memetics.entity.SocialMediaSignin;
import au.com.memetics.service.ProfileService;
import au.com.memetics.service.RegistrationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionKey;
import org.springframework.social.connect.UserProfile;
import org.springframework.social.connect.web.ProviderSignInUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.List;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@Slf4j
@Tag(name = "registration", description = "User registration")
public class RegistrationController {
    private final ProviderSignInUtils providerSignInUtils;
    private final RegistrationService service;
    private final ProfileService profileService;

    @Autowired
    public RegistrationController(final RegistrationService service, final ProviderSignInUtils providerSignInUtils, ProfileService profileService) {
        this.service = service;
        this.providerSignInUtils = providerSignInUtils;
        this.profileService = profileService;
    }

    @GetMapping(path = "/register", produces = APPLICATION_JSON_VALUE)
    public Registration getRegistrationDetails(final WebRequest request) {
        Connection<?> connection = providerSignInUtils.getConnectionFromSession(request);
        Registration registration = createRegistrationDTO(connection);

        log.debug("Rendering registration form with information: {}", registration);

        return registration;
    }

    /**
     * Creates the form object used in the registration form.
     *
     * @param socialMediaConnection Spring social connection
     * @return If a user is signing in by using a service provider, this method returns a form
     * object populated by the values given by the provider. Otherwise this method returns
     * an empty form object (normal form registration).
     */
    private Registration createRegistrationDTO(final Connection<?> socialMediaConnection) {
        Registration registration = new Registration();

        if (nonNull(socialMediaConnection)) {
            UserProfile socialMediaProfile = socialMediaConnection.fetchUserProfile();
            registration.setEmail(socialMediaProfile.getEmail()); // not available from Twitter
            registration.setFirstName(socialMediaProfile.getFirstName());
            registration.setLastName(socialMediaProfile.getLastName());
            registration.setNickname(socialMediaProfile.getUsername());

            ConnectionKey providerKey = socialMediaConnection.getKey();
            registration.setSocialMediaSignin(SocialMediaSignin.valueOf(providerKey.getProviderId().toUpperCase()));
        }

        return registration;
    }

    @PostMapping(path = "/register")
    @ResponseStatus(CREATED)
    public Profile createProfile(@RequestBody final Registration registration, final WebRequest request) {
        Profile profile = service.createProfile(registration);
        Authentication authentication = new UsernamePasswordAuthenticationToken(profile, null, profile.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //If the user is signing in by using a service provider, this method call stores
        //the connection to the UserConnection table. Otherwise, this method does not do anything.
        providerSignInUtils.doPostSignUp(profile.getEmail(), request);

        log.debug("Profile {} has been signed in", profile);

        return profile;
    }

    @GetMapping("/email-check")
    @Operation(summary = "Email check")
    public boolean emailCheck(@RequestParam("emailAddress") String emailAddress) {
        return profileService.emailCheck(emailAddress);
    }

    @GetMapping("/nickname-check")
    @Operation(summary = "Nickname check")
    public boolean nicknameCheck(@RequestParam("nickname") String nickname) {
        return profileService.nicknameCheck(nickname);
    }


    @GetMapping("/rest/registration")
    @Operation(summary = "Search for profiles")
    public List<Profile> getAll(@ModelAttribute ProfileSearchCriteria profileSearchCriteria) {
        return profileService.search(profileSearchCriteria);
    }

    @GetMapping("/nickname/{nickname}")
    @Operation(summary = "Get profile by nickname")
    public Profile getByNickname(final @PathVariable("nickname") String nickname) {
        Profile profile = profileService.getByNickname(nickname);
        if (isNull(profile)) {
            throw new NotFoundException();
        }
        return profile;
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "Get profile by email")
    public Profile getByEmail(final @PathVariable("email") String email) {
        Profile profile = profileService.getByEmail(email);
        if (isNull(profile)) {
            throw new NotFoundException();
        }
        return profile;
    }


    private void verifyProfileExists(final long id) {
        if (isNull(profileService.get(id))) {
            throw new NotFoundException();
        }
    }
}
