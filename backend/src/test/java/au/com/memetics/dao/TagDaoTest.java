package au.com.memetics.dao;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.junit.Assert.assertThat;

import java.util.List;

import au.com.memetics.entity.Tag;
import au.com.memetics.entity.TagStat;
import au.com.memetics.entity.TagStatAggregated;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.github.springtestdbunit.annotation.DatabaseSetup;
import au.com.memetics.AbstractTest;
import au.com.memetics.entity.Tag;
import au.com.memetics.entity.TagStat;
import au.com.memetics.entity.TagStatAggregated;

@DatabaseSetup({"classpath:dbunit/_none.xml"})
public class TagDaoTest extends AbstractTest {
    @Autowired
    private TagDao tagDao;

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldGetTagStats() throws Exception {
        List<TagStat> tagStats = tagDao.getStats();

        assertThat(tagStats, hasSize(3));
        assertThat(tagStats.get(0).getText(), is("atag"));
        assertThat(tagStats.get(0).getWeight(), is(1L));
        assertThat(tagStats.get(1).getText(), is("atag_subcategory"));
        assertThat(tagStats.get(1).getWeight(), is(1L));
        assertThat(tagStats.get(2).getText(), is("btag"));
        assertThat(tagStats.get(2).getWeight(), is(2L));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldGetStatsWithSubcategoriesAggregated() throws Exception {
        List<TagStatAggregated> tagStats = tagDao.getStatsWithSubcategoriesAggregated();

        assertThat(tagStats, hasSize(2));
        assertThat(tagStats.get(0).getCategory(), is("atag"));
        assertThat(tagStats.get(0).getWeight(), is(2L));
        assertThat(tagStats.get(1).getCategory(), is("btag"));
        assertThat(tagStats.get(1).getWeight(), is(2L));
    }

    @Test
    @DatabaseSetup({"classpath:dbunit/profile.xml", "classpath:dbunit/follow.xml", "classpath:dbunit/meme.xml"})
    public void shouldGetUnusedTags() throws Exception {
        List<Tag> tags = tagDao.getUnusedTags();

        assertThat(tags, hasSize(1));
        assertThat(tags.get(0).getName(), is("ctag"));
    }
}
