package au.com.memetics.dao;

import au.com.memetics.entity.Comment;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import au.com.memetics.AbstractTest;
import au.com.memetics.entity.Comment;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;

import java.util.List;

@SuppressWarnings("unchecked")
@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class CommentDaoTest extends AbstractTest {
    @Autowired
    private CommentDao dao;

    @Test
    @DatabaseSetup({"classpath:dbunit/comment/shouldFindCommentById.xml"})
    public void shouldFindCommentById() {
        Comment comment = dao.findById(111L).orElse(null);

        assertThat(comment.getId(), is(111L));
        assertThat(comment.getProfile().getId(), is(11L));
        assertThat(comment.getMemeId(), is(1L));
//        assertThat(comment.getMeme().getId(), is(1L));
        assertThat(comment.getCommentText(), is("a comment"));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/comment/shouldFindByProfileId.xml"})
    public void shouldFindByProfileId() {
        List<Comment> comments = dao.findByProfileId(11L);

        assertThat(comments, hasSize(1));
        assertThat(comments.get(0).getId(), is(111L));
        assertThat(comments.get(0).getProfile().getId(), is(11L));
    }
}