package au.com.memetics.dao;

import java.util.List;

import au.com.memetics.entity.Tag;
import au.com.memetics.entity.TagStat;
import au.com.memetics.entity.TagStatAggregated;
import au.com.memetics.entity.Tag;
import au.com.memetics.entity.TagStat;
import au.com.memetics.entity.TagStatAggregated;

public interface TagDaoCustom {
    List<TagStat> getStats();
    List<TagStatAggregated> getStatsWithSubcategoriesAggregated();
    List<Tag> getUnusedTags();
}
