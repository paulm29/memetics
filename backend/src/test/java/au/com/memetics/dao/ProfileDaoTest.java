package au.com.memetics.dao;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.hamcrest.core.IsNull.notNullValue;

import java.util.List;

import au.com.memetics.entity.Profile;
import au.com.memetics.entity.ProfileSearchCriteria;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import au.com.memetics.AbstractTest;
import au.com.memetics.entity.Profile;
import au.com.memetics.entity.ProfileSearchCriteria;

import org.junit.After;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class ProfileDaoTest extends AbstractTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProfileDaoCustom profileDao;

//    @After
//    public void checkDatabase() throws Exception {
//        //http://localhost:8082
//        Thread.sleep(120 * 1000L);
//    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldGetByEmail() {
        Profile profile = userRepository.findByEmail("profile11@email.com");

        assertThat(profile, notNullValue());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldGetByNickname() {
        Profile profile = userRepository.findByNickname("nickname1");

        assertThat(profile, notNullValue());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldSearchByNickname() {
        ProfileSearchCriteria criteria = new ProfileSearchCriteria();
        criteria.setNickname("nickname1");
        List<Profile> profileList = profileDao.findBy(criteria);

        assertThat(profileList, hasSize(1));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldSearchByEmail() {
        ProfileSearchCriteria criteria = new ProfileSearchCriteria();
        criteria.setEmail("profile11@email.com");
        List<Profile> profileList = profileDao.findBy(criteria);

        assertThat(profileList, hasSize(1));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldSearchByEmailAndNickname() {
        ProfileSearchCriteria criteria = new ProfileSearchCriteria();
        criteria.setEmail("profile11@email.com");
        criteria.setNickname("nickname1");
        List<Profile> profileList = profileDao.findBy(criteria);

        assertThat(profileList, hasSize(1));
    }
}
