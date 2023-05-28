package au.com.memetics.service;

import au.com.memetics.AbstractTest;
import au.com.memetics.entity.Meme;
import au.com.memetics.entity.Profile;
import au.com.memetics.entity.Tag;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.hamcrest.MatcherAssert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import static java.util.Arrays.asList;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasProperty;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.hamcrest.core.Is.is;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class MemeServiceTest extends AbstractTest {
    @Autowired
    private MemeService service;
    @Autowired
    private ProfileService profileService;
    @Autowired
    private TagService tagService;

    @SuppressWarnings("unchecked")
    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldGetMeme() {
        Meme meme = service.get(1L);

        assertThat(meme.getId(), is(1L));
    }

    @SuppressWarnings("unchecked")
    @Test
    @DatabaseSetup({"classpath:dbunit/profile_only.xml"})
    public void shouldCreateMemeWithNewTags() throws Exception {
        Meme meme = new Meme();
        meme.setTitle("title");
        meme.setUrl("url");
        Profile profile = profileService.get(11L);
        meme.setProfile(profile);
        Tag tag1 = new Tag("ctag");
        Tag tag2 = new Tag("dtag");
        meme.getTags().addAll(asList(tag1, tag2));

        Meme created = service.create(meme);

        assertThat(created.getTags(), hasSize(2));
        assertThat(created.getTags(), hasItems(
                hasProperty("name", is("ctag")),
                hasProperty("name", is("dtag"))
        ));
    }

    @SuppressWarnings("unchecked")
    @Test
    @Transactional
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldCreateMemeWithNewAndExistingTags() throws Exception {
        Meme meme = new Meme();
        meme.setTitle("title");
        meme.setUrl("url");
        Profile profile = profileService.get(11L);
        meme.setProfile(profile);
        Tag existingTag = tagService.get(1L);
        Tag newTag = new Tag("ctag");
        meme.getTags().addAll(asList(existingTag, newTag));

        service.create(meme);

        assertThat(meme.getTags(), hasSize(2));
        assertThat(meme.getTags(), hasItems(
                hasProperty("id", is(1L))
        ));
        assertThat(meme.getTags(), hasItems(
                hasProperty("name", is("atag")),
                hasProperty("name", is("ctag"))
        ));
    }

    @SuppressWarnings("unchecked")
    @Test
    @Transactional
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldUpdateMeme() throws Exception {
        Meme meme = service.get(1L);
        Tag existingTag = meme.getTags().iterator().next();
        Tag newTag = new Tag("ztag");
        meme.getTags().clear();
        meme.getTags().addAll(asList(existingTag, newTag));

        Meme updated = service.update(meme);

        assertThat(updated.getTags(), hasSize(2));
        assertThat(updated.getTags(), hasItems(
                hasProperty("name", is("ztag"))
        ));
    }

    @Test
    @Transactional
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldIncrementMemeUsageCount() throws Exception {
        service.incrementUsage(1L);

        MatcherAssert.assertThat(service.get(1L).getUsageCount(), is(2L));
    }

    @Test
    @Transactional
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldDecrementMemeUsageCount() throws Exception {
        service.decrementUsage(1L);

        MatcherAssert.assertThat(service.get(1L).getUsageCount(), is(0L));
    }
}
