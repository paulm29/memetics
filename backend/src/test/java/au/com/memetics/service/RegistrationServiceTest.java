package au.com.memetics.service;

import au.com.memetics.AbstractTest;
import au.com.memetics.controller.formsignin.DuplicateEmailException;
import au.com.memetics.controller.formsignin.Registration;
import au.com.memetics.entity.Profile;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class RegistrationServiceTest extends AbstractTest {
    @Autowired
    private RegistrationService registrationService;

    @Test
    @DatabaseSetup({"classpath:dbunit/profile/shouldCreateNewProfile.xml"})
    public void shouldCreateNewProfile() throws DuplicateEmailException {
        Registration registration = new Registration();
        registration.setEmail("test@domain.com");
        registration.setPassword("password");
        registration.setPasswordVerification("passwordVerification");
        registration.setNickname("nickname");
        registration.setCountry("country");
        // not mandatory
        registration.setFirstName("firstName");
        registration.setLastName("lastName");

        Profile profile = registrationService.createProfile(registration);

        assertThat(profile.getNickname(), is("nickname"));
    }

}
