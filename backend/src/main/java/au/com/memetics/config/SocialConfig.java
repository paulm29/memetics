package au.com.memetics.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.social.UserIdSource;
import org.springframework.social.config.annotation.ConnectionFactoryConfigurer;
import org.springframework.social.config.annotation.EnableSocial;
import org.springframework.social.config.annotation.SocialConfigurer;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.connect.jdbc.JdbcUsersConnectionRepository;
import org.springframework.social.connect.web.ConnectController;
import org.springframework.social.connect.web.ProviderSignInUtils;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.security.AuthenticationNameUserIdSource;
import org.springframework.social.twitter.connect.TwitterConnectionFactory;

import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableSocial
@Slf4j
public class SocialConfig implements SocialConfigurer {
    @Autowired
    private DataSource dataSource;
    @Autowired
    private Environment environment;

    @Override
    public void addConnectionFactories(final ConnectionFactoryConfigurer cfc, final Environment env) {
        cfc.addConnectionFactory(new TwitterConnectionFactory(
                env.getProperty("twitterConsumerKey"),
                env.getProperty("twitterConsumerSecret")
        ));
        cfc.addConnectionFactory(new FacebookConnectionFactory(
                env.getProperty("facebookAppId"),
                env.getProperty("facebookAppSecret")
        ));
    }

    /**
     * The UserIdSource determines the account ID of the user. The example application
     * uses the username as the account ID.
     */
    @Override
    public UserIdSource getUserIdSource() {
        return new AuthenticationNameUserIdSource();
    }

    @Override
    public UsersConnectionRepository getUsersConnectionRepository(final ConnectionFactoryLocator connectionFactoryLocator) {
        return new JdbcUsersConnectionRepository(
                dataSource,
                connectionFactoryLocator,
                Encryptors.noOpText()
                /*
                  The TextEncryptor object encrypts the authorization details of the connection. In
                  our example, the authorization details are stored as plain text.
                  DO NOT USE THIS IN PRODUCTION.
                 */
                // http://stackoverflow.com/questions/12619986/what-is-the-correct-way-to-configure-a-spring-textencryptor-for-use-on-heroku
//                Encryptors.text(environment.getProperty("security.encryptPassword"), environment.getProperty("security.encryptSalt"))
                // RegistrationController.createProfile(au.com.memetics.controller.formsignin.Registration,org.springframework.web.context.request.WebRequest)]: java.lang.IllegalArgumentException: Unable to initialize due to invalid secret key
        );
    }

    /**
     * This bean manages the connection flow between the account provider and
     * the example application.
     */
    @Bean
    public ConnectController connectController(final ConnectionFactoryLocator connectionFactoryLocator, final ConnectionRepository connectionRepository) {
        return new ConnectController(connectionFactoryLocator, connectionRepository);
    }

    @Bean
    public ProviderSignInUtils providerSignInUtils(final ConnectionFactoryLocator connectionFactoryLocator, final UsersConnectionRepository connectionRepository) {
        return new ProviderSignInUtils(connectionFactoryLocator, connectionRepository);
    }
}
