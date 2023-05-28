package au.com.memetics.controller.formsignin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class SignUpController {
    /**
     * Redirects request forward to the registration page. This hack is required because
     * there is no way to set the sign in url to the SocialAuthenticationFilter class.
     * Another option is to move registration page to to url '/signup' but I did not
     * want to do that because that url looks a bit ugly to me.
     */
    @GetMapping(path = "/signup")
    public String redirectRequestToRegistrationPage() {
        log.debug("Redirecting request to registration page.");
        return "redirect:" + "/registration";
    }

}
