package au.com.memetics.service;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.junit.Assert.assertThat;

import java.net.URISyntaxException;

import au.com.memetics.dto.ProfileDTO;
import au.com.memetics.entity.Follow;
import au.com.memetics.entity.Profile;
import au.com.memetics.entity.ProfileStats;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.github.springtestdbunit.annotation.DatabaseSetup;
import au.com.memetics.AbstractTest;
import au.com.memetics.dao.UserRepository;
import au.com.memetics.dto.ProfileDTO;
import au.com.memetics.entity.Follow;
import au.com.memetics.entity.Profile;
import au.com.memetics.entity.ProfileStats;
import au.com.memetics.util.ProfileDTOMother;
import au.com.memetics.util.ProfileMother;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class ProfileServiceTest extends AbstractTest {
    @Autowired
    private ProfileService profileService;
    @Autowired
    private UserRepository userRepository;

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldGetProfileStats() throws Exception {
        ProfileStats stats = profileService.getStats(11L);

        assertThat(stats.getFollowers(), is(1L));
        assertThat(stats.getFollowing(), is(1L));
        assertThat(stats.getMemesCreated(), is(2L));
        assertThat(stats.getCommentsMine(), is(1L));
        assertThat(stats.getMemesLikedByMe(), is(1L));
        assertThat(stats.getMemesByMeLikedByOthers(), is(1L));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/follow/shouldAddNewFollowing.xml"})
    public void shouldAddNewFollowing() {
        Profile existingOther = profileService.get(11L);
        Profile profile = ProfileMother.withRequiredFields();
        Follow follow = new Follow();
        follow.setFollower(existingOther);
        follow.setFollowing(profile);
        profile.getFollowing().add(follow);

        Profile created = profileService.create(profile);

        assertThat(created.getFollowing(), hasSize(1));
        assertThat(created.getFollowers(), hasSize(0));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme_none.xml", "classpath:dbunit/hashtag_favourites_none.xml"})
    public void shouldRemoveFollowing() throws URISyntaxException {
        ProfileDTO profile = ProfileDTOMother.withRequiredFields();
        profile.setId(11L);
        profile.getFollowing().clear();

        Profile updated = profileService.update(profile);

        assertThat(updated.getFollowing(), hasSize(0));
        assertThat(updated.getFollowers(), hasSize(0));
//        Profile p = userRepository.findOne(profile.getId()); // TODO
//        assertThat(p.getFollowing(), hasSize(0));
//        assertThat(p.getFollowers(), hasSize(0));
    }

}
