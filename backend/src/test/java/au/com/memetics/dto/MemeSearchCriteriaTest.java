package au.com.memetics.dto;

import au.com.memetics.entity.MemeSearchCriteria;
import org.junit.Test;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.hamcrest.core.IsCollectionContaining.hasItems;
import static org.junit.Assert.assertThat;

public class MemeSearchCriteriaTest {
    @Test
    public void shouldGetProviderIds() throws Exception {
        MemeSearchCriteria criteria = new MemeSearchCriteria();
        criteria.setTags("atag,btag");

        assertThat(criteria.getTagList(), hasSize(2));
        assertThat(criteria.getTagList(), hasItems("atag", "btag"));
    }

    @Test
    public void shouldGetEmptyProviderIdListWhenNone() throws Exception {
        MemeSearchCriteria criteria = new MemeSearchCriteria();

        assertThat(criteria.getTagList(), hasSize(0));
    }
}