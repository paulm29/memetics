package au.com.memetics.service;

import au.com.memetics.AbstractTest;
import au.com.memetics.entity.Meme;
import au.com.memetics.entity.Vote;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.Is.is;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class VoteServiceTest extends AbstractTest {
    @Autowired
    private VoteService service;

    @Test
    @DatabaseSetup({"classpath:dbunit/vote/shouldCreateVote.xml"})
    public void shouldCreateVote() {
        Vote vote = new Vote();
        Meme meme = new Meme();
        meme.setId(1L);
//        vote.setMeme(meme);
        vote.setMemeId(1L);
        vote.setProfileId(11L);
        vote.setScore(1L);

        Vote created = service.create(vote);

        assertThat(created.getMemeId(), is(1L));
        assertThat(created.getProfileId(), is(11L));
        assertThat(created.getScore(), is(1L));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/vote/shouldUpdateVote.xml"})
    public void shouldUpdateVote() {
        Vote vote = new Vote();
        Meme meme = new Meme();
        meme.setId(1L);
//        vote.setMeme(meme);
        vote.setMemeId(1L);
        vote.setProfileId(11L);
        vote.setScore(2L);

        Vote updated = service.update(vote);

        assertThat(updated.getMemeId(), is(1L));
        assertThat(updated.getProfileId(), is(11L));
        assertThat(updated.getScore(), is(2L));
    }
}
