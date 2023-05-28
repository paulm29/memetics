package au.com.memetics.security;

import au.com.memetics.entity.Profile;
import com.fasterxml.jackson.databind.ObjectWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final ObjectWriter objectWriter;

    @Autowired
    AuthenticationSuccessHandler(ObjectWriter objectWriter) {
        this.objectWriter = objectWriter;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("================================================");
        log.debug("onAuthenticationSuccess: " + authentication.getName());
        log.info("================================================");

        clearAuthenticationAttributes(request);

        Profile profile = (Profile) authentication.getPrincipal();


        String json = objectWriter.writeValueAsString(profile);
        response.getWriter().println(json);
    }
}