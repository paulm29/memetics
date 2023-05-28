package au.com.memetics.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class AuthenticationEntryPoint implements org.springframework.security.web.AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {

        log.info("================================================");
        if (request.getUserPrincipal() != null) {
            log.debug("commence: " + request.getUserPrincipal().getName());
        }
        log.info("================================================");


        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }
}