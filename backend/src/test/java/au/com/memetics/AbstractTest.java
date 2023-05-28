package au.com.memetics;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import com.github.springtestdbunit.annotation.DbUnitConfiguration;
import com.xebialabs.restito.server.StubServer;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockitoTestExecutionListener;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.File;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import static com.xebialabs.restito.builder.stub.StubHttp.whenHttp;
import static com.xebialabs.restito.semantics.Action.resourceContent;
import static com.xebialabs.restito.semantics.Action.status;
import static com.xebialabs.restito.semantics.Condition.get;
import static com.xebialabs.restito.semantics.Condition.parameter;
import static org.glassfish.grizzly.http.util.HttpStatus.OK_200;
import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.MOCK;

@Slf4j
@SuppressWarnings("ConstantConditions")
@RunWith(SpringRunner.class)
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = MOCK)
@TestPropertySource(locations = "classpath:test.properties")
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DbUnitTestExecutionListener.class,
        MockitoTestExecutionListener.class})
@DbUnitConfiguration(databaseConnection = {"dbUnitDatabaseConnection"})
public abstract class AbstractTest {
    private static StubServer twitterService;

    @Autowired
    private WebApplicationContext context;

    @BeforeClass
    public static void beforeClass() {
        twitterService = new StubServer(allocateRandomPortForFakeService("twitter.server")).run();
    }

    @AfterClass
    public static void afterClass() {
        twitterService.stop();
    }

    @Before
    public void initRestAssuredMockMvc() {
        clearServiceState();

        whenHttp(twitterService).
                match(get("/rest/twitter"), parameter("name", "name")).
                then(status(OK_200), resourceContent("twitter/tweet.json"));

        MockMvc mvc = MockMvcBuilders.webAppContextSetup(context)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
        RestAssuredMockMvc.mockMvc(mvc);
    }

    @After
    @DatabaseTearDown({"classpath:dbunit/_teardown.xml"})
    public void after() {
    }

    private void clearServiceState() {
        twitterService.clear();
    }

    protected File withContent(String filename) throws URISyntaxException {
        return new File(this.getClass().getClassLoader().getResource(filename).toURI());
    }

    String fileContent(String filename) throws URISyntaxException, IOException {
        return StringUtils.join(Files.readAllLines(Paths.get(this.getClass().getClassLoader().getResource(filename).toURI())), "\n");
    }

    public static int allocateRandomPortForFakeService(String serviceName) {
        String currentSetting = System.getProperty(serviceName);
        int openPort = -1;
        if (StringUtils.isEmpty(currentSetting)) {
            for (int cnt = 0; cnt < 10; ++cnt) {
                int randomNum = ThreadLocalRandom.current().nextInt(49152, 65535 + 1);
                try (ServerSocket socket = new ServerSocket(randomNum)) {
                    openPort = socket.getLocalPort();
                    break;
                } catch (IOException ioex) {
                    log.info("Found used port [{}], retrying", randomNum);
                }
            }
            if (openPort < 0) {
                throw new ExceptionInInitializerError("Could not allocate open port");
            }
            System.setProperty(serviceName, "localhost:" + openPort);
            log.info("Setting endpoint {} {}", serviceName, System.getProperty(serviceName));
        } else {
            openPort = Integer.parseInt(currentSetting.split(":")[1]);
        }
        return openPort;
    }

    public Principal userWithPermission() {
        Collection<? extends GrantedAuthority> authorities = null;
        return new Principal() {
            @Override
            public String getName() {
                return null;
            }
        };
    }

//    Principal userWithPermission(String organisationId, String permission) throws Exception {
//        // Create permissionRole for role "USER" with given permission
//        Permission.Role userRole = new Permission.Role("ESL", "USER", new ArrayList<>());
//        Permission setupForPermissions = new Permission(permission, Collections.singleton(userRole));
//        Mockito.reset(permissionCache);
//        Mockito.when(permissionCache.getPermissionSet(anyString(), eq(permission))).thenReturn(setupForPermissions);
//
//        // Create user using "USER" role which has the given permission
//        SateRequestContextHolder.setSateRequestDetails(SateRequestDetails.builder().currentOrganisationId(organisationId).build());
//        User user = new User();
//        user.setOrgs(Collections.singletonList(new Organisation(null, organisationId, new ArrayList<>())));
//        Role role = new Role("ESL", "USER");
//        Collection<? extends GrantedAuthority> authorities = Collections.singletonList(new SateGrantedAuthority(organisationId, Long.parseLong(organisationId), role));
//        return new SateApplicationToken("subject", "issuer", user, "idToken", 0L, "accessToken", 0L, "refreshToken", authorities);
//    }

    public Principal mockSecurityContext() {
        SecurityContext context = SecurityContextHolder.createEmptyContext();

        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

        UserDetails principal = new User("username", "password", true, true, true, true, grantedAuthorities);


        Authentication authentication = new UsernamePasswordAuthenticationToken(
                principal, principal.getPassword(), principal.getAuthorities());
        context.setAuthentication(authentication);

        return authentication;
    }

    // 2 below from https://stackoverflow.com/questions/8946497/mocking-authentication-spring-security
    // not needed as I think above is sufficient, but still have unrelated error:
    // Error creating bean with name 'scopedTarget.connectionRepository' defined in class path resource [org/springframework/social/config/annotation/SocialConfiguration.class]: Bean instantiation via factory method failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.springframework.social.connect.ConnectionRepository]: Factory method 'connectionRepository' threw exception; nested exception is java.lang.IllegalStateException: Unable to get a ConnectionRepository: no user signed in
    public void login() {
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("username", "password"));
    }

    public void logout() {
        SecurityContextHolder.clearContext();
    }
}
