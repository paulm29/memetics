package au.com.memetics.dao;

import au.com.memetics.AbstractTest;
import au.com.memetics.entity.Meme;
import au.com.memetics.entity.MemeSearchCriteria;
import au.com.memetics.util.CustomMatchers;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.hamcrest.CoreMatchers;
import org.hamcrest.MatcherAssert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.hamcrest.core.Is.is;

@SuppressWarnings("unchecked")
public class MemeDaoTest extends AbstractTest {
    @Autowired
    private MemeDao dao;

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/follow.xml"})
    public void shouldFindMemeById() throws Exception {
        Meme meme = dao.findById(1L).orElse(null);

        assertThat(meme.getId(), is(1L));
        assertThat(meme.getProfile().getId(), is(11L));
        assertThat(meme.getTitle(), is("title1"));
        assertThat(meme.getUrl(), is("http://"));
        assertThat(meme.getDeleteLink(), is("http://"));
        assertThat(meme.getCreatedDate().toString(), is("1970-01-01 10:00:00.0"));
        assertThat(meme.getCredits(), is("credits1"));
        assertThat(meme.getUsageCount(), is(1L));
        assertThat(meme.getDuplicate(), is(2L));
        assertThat(meme.getUpvotes(), is(1L));
        assertThat(meme.getDownvotes(), is(1L));
        assertThat(meme.getScore(), is(0L));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/follow.xml"})
    public void shouldFindRandom() throws Exception {
        Meme meme = dao.findRandom();

        assertThat(meme.getId(), notNullValue());
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/follow.xml"})
    public void shouldFindByMyMemes() throws Exception {
        MemeSearchCriteria criteria = new MemeSearchCriteria();
        criteria.setProfileId(11L);
        criteria.setMyMemes(true);

        List<Meme> memes = dao.findBy(criteria);

        assertThat(memes, hasSize(2));
        assertThat(memes.get(0).getId(), is(1L));
        assertThat(memes.get(1).getId(), is(2L));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/follow.xml"})
    public void shouldNotFindByMyMemes() {
        MemeSearchCriteria criteria = new MemeSearchCriteria();
        criteria.setProfileId(11L);
        criteria.setMyMemes(false);

        List<Meme> memes = dao.findBy(criteria);

        assertThat(memes, hasSize(3));
        assertThat(memes.get(0).getId(), is(1L));
        assertThat(memes.get(1).getId(), is(2L));
        assertThat(memes.get(2).getId(), is(3L));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/follow.xml"})
    public void shouldFindByProfileNickname() {
        MemeSearchCriteria criteria = new MemeSearchCriteria();
        criteria.setNickname("nickname1");

        List<Meme> memes = dao.findBy(criteria);

        assertThat(memes, hasSize(2));
        MatcherAssert.assertThat(memes, CoreMatchers.hasItems(
                CustomMatchers.withId(1L),
                CustomMatchers.withId(2L))
        );
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/follow.xml"})
    public void shouldFindByTitle() throws Exception {
        MemeSearchCriteria criteria = new MemeSearchCriteria();
        criteria.setTitle("title1");

        List<Meme> memes = dao.findBy(criteria);

        assertThat(memes, hasSize(1));
        MatcherAssert.assertThat(memes, CoreMatchers.hasItems(
                CustomMatchers.withId(1L))
        );
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/follow.xml"})
    public void shouldFindByCredits() {
        MemeSearchCriteria criteria = new MemeSearchCriteria();
        criteria.setCredits("credits1");

        List<Meme> memes = dao.findBy(criteria);

        assertThat(memes, hasSize(1));
        MatcherAssert.assertThat(memes, CoreMatchers.hasItems(
                CustomMatchers.withId(1L))
        );
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/follow.xml"})
    public void shouldFindByTags() {
        MemeSearchCriteria criteria = new MemeSearchCriteria();
        criteria.setTags("atag,btag");

        List<Meme> memes = dao.findBy(criteria);

        assertThat(memes, hasSize(2));
        MatcherAssert.assertThat(memes, CoreMatchers.hasItems(
                CustomMatchers.withId(1L), CustomMatchers.withId(2L))
        );
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/follow.xml"})
    public void shouldFindLiked() {
        List<Meme> memes = dao.findLiked(11L);

        assertThat(memes, hasSize(1));
        assertThat(memes.get(0).getId(), is(1L));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/meme.xml", "classpath:dbunit/follow.xml"})
    public void shouldFindUnprocessed() {
        List<Meme> memes = dao.findUnprocessed(12L);

        assertThat(memes, hasSize(1));
        assertThat(memes.get(0).getId(), is(3L));
    }
}