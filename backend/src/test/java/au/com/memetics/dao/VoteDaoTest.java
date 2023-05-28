package au.com.memetics.dao;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.After;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.github.springtestdbunit.annotation.DatabaseSetup;
import au.com.memetics.AbstractTest;

public class VoteDaoTest extends AbstractTest {
    @Autowired
    private VoteDao voteDao;

    @Test
    @DatabaseSetup({"classpath:dbunit/vote/shouldGetCountOfMemesVoted.xml"})
    public void shouldGetCountOfMemesVoted() {
        long actual = voteDao.countByProfileId(11L);

        assertThat(actual, is(1L));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/vote/shouldGetLikedByOthersCountForProfile.xml"})
    public void shouldGetLikedByOthersCountForProfile() {
        long actual = voteDao.getNumberOfLikesForAllMyMemes(11L);

        assertThat(actual, is(1L));
    }
}
