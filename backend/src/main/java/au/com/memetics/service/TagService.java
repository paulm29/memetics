package au.com.memetics.service;

import au.com.memetics.dao.TagDao;
import au.com.memetics.entity.Tag;
import au.com.memetics.entity.TagStat;
import au.com.memetics.entity.TagStatAggregated;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TagService {
    private final TagDao dao;

    @Autowired
    public TagService(final TagDao tagDao) {
        this.dao = tagDao;
    }

    public List<Tag> getAll() {
        return dao.findAll();
    }

    public List<TagStat> getStats() {
        return dao.getStats();
    }

    public List<TagStatAggregated> getStatsWithSubcategoriesAggregated() {
        return dao.getStatsWithSubcategoriesAggregated();
    }

    public Tag get(final long id) {
        return dao.findById(id).orElse(null);
    }

    public Tag get(final String name) {
        return dao.findByNameIgnoreCase(name);
    }

    public Tag create(final Tag tag) {
        return dao.save(tag);
    }

    public void update(final Tag tag) {
        dao.save(tag);
    }

    public void delete(final long id) {
        dao.deleteById(id);
    }

    public List<Tag> getUnusedTags() {
        return dao.getUnusedTags();
    }
}
