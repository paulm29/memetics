package au.com.memetics.config;

import au.com.memetics.dao.UserRepository;
import au.com.memetics.security.AuthenticationEntryPoint;
import au.com.memetics.security.AuthenticationSuccessHandler;
import au.com.memetics.security.LogoutSuccessHandler;
import au.com.memetics.service.FollowService;
import au.com.memetics.service.ProfileServiceImpl;
import au.com.memetics.service.SocialUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.social.security.SocialUserDetailsService;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@Profile(value = {"dev", "prod", "test"})
public class SecurityConfig {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FollowService followService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${security.enabled:true}")
    private boolean securityEnabled;


    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;
    @Autowired
    private AuthenticationSuccessHandler authenticationSuccessHandler;
    @Autowired
    private LogoutSuccessHandler logoutSuccessHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authz) -> authz
                        .anyRequest().authenticated()
                )
                .httpBasic(withDefaults());
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/ignore1", "/ignore2");

//        if (securityEnabled) {
//            web.ignoring().antMatchers("/static/**");
//        } else {
//            web.ignoring().antMatchers("/**");
//        }

//        http.authorizeRequests()
//                .antMatchers("/rest/admin/**").hasRole("ADMIN")
//                .antMatchers("/rest/profiles/search").permitAll() // duplicate check
//                .antMatchers(
//                        "/auth/**",
//                        "/login",                   // twitter ?
//                        "/logout",                  // twitter ?
//                        "/signin",                  // facebook
//                        "/signup",                  // twitter ?
//                        "/register",                // twitter ?
//                        "/registration",            // twitter ?
//                        "/rest/registration",       // registrationGetAll - TODO have separate email check endpoint instead?
//                        "/rest/application-config",  // application config
//                        "/rest/memes/**",  // only for e2e tests
//                        "/rest/profiles/**",  // only for e2e tests
//                        "/rest/queue"  // only for e2e tests
//                ).permitAll()
//                .antMatchers("/rest/**").authenticated()
//                .antMatchers("/**").permitAll() // should be redundant given above, but haven't bothered testing
//                .and()
//                .apply(new SpringSocialConfigurer());
//
//        http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
//        http.formLogin()
//                .successHandler(authenticationSuccessHandler)
//                .failureHandler(new SimpleUrlAuthenticationFailureHandler());
//        http.logout().logoutSuccessHandler(logoutSuccessHandler);
//
//        http.csrf().disable();
//        http.headers().cacheControl();
//        http.headers().frameOptions().disable(); // needed to use H2 web console
    }

    /**
//     * Configures the authentication manager bean which processes authentication
//     * requests.
//     */
//    @Override
//    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder);
//    }

    /**
     * This bean is used to load the user specific data when social sign in
     * is used.
     */
    @Bean
    public SocialUserDetailsService socialUserDetailsService() {
        return new SocialUserDetailsServiceImpl(userDetailsService());
    }

    /**
     * This bean is load the user specific data when form login is used.
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return new ProfileServiceImpl(userRepository, followService);
    }
}
