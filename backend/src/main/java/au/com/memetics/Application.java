package au.com.memetics;

import au.com.memetics.config.SecurityConfig;
import au.com.memetics.config.SocialConfig;
import au.com.memetics.config.SwaggerConfig;
import au.com.memetics.config.WebConfig;
import au.com.memetics.service.SecurityService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Validator;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@SpringBootApplication
@EnableJpaRepositories
@Import({
        SocialConfig.class,
        SwaggerConfig.class,
        SecurityConfig.class,
        WebConfig.class
})
@EnableScheduling
@Slf4j
public class Application extends SpringBootServletInitializer {
    public static void main(final String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public SecurityService securityService() {
        return new SecurityService();
    }

    @Bean
    public Validator localValidatorFactoryBean() {
        return new LocalValidatorFactoryBean();
    }

    @Bean
    public ObjectWriter objectWriter() {
        return new ObjectMapper().writer();
    }

    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("i18n/messages");
        messageSource.setUseCodeAsDefaultMessage(true);
        return messageSource;
    }

    /**
     * This is used to hash the password of the user.
     * Defined here, not WebSecurityConfig as web security disabled for testing.
     */
    private static final int SIZE = 10;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(SIZE);
    }

    // TODO have my app handle all 404s?
//    https://stackoverflow.com/questions/38516667/springboot-angular2-how-to-handle-html5-urls
//    @Bean
//    ErrorViewResolver supportPathBasedLocationStrategyWithoutHashes() {
//        return new ErrorViewResolver() {
//            @Override
//            public ModelAndView resolveErrorView(HttpServletRequest request, HttpStatus status, Map<String, Object> model) {
//                return status == HttpStatus.NOT_FOUND
//                        ? new ModelAndView("index.html", Collections.<String, Object>emptyMap(), HttpStatus.OK)
//                        : null;
//            }
//        };
//    }
}
