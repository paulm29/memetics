package au.com.memetics.dao;

import au.com.memetics.entity.Tag;
import au.com.memetics.entity.TagStat;
import au.com.memetics.entity.TagStatAggregated;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TagDaoImpl implements TagDaoCustom {
    @PersistenceContext
    private EntityManager em;

    @SuppressWarnings("unchecked")
    @Override
    public List<TagStat> getStats() {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT t.tag_id AS tagId, t.name AS text, COUNT(mt.meme_id) AS weight FROM tag t");
        queryString.append(" INNER JOIN meme_tag mt ON t.tag_id = mt.tag_id");
        queryString.append(" GROUP BY t.name");
        queryString.append(" ORDER BY text");
        Query query = em.createNativeQuery(queryString.toString(), "tagStats");

        return (List<TagStat>) query.getResultList();
    }

    // can't use substring_index is not supported by H2
    // queryString.append("SELECT substring_index(t.name, '_', 1) AS category, COUNT(mt.meme_id) AS weight FROM tag t");
    @SuppressWarnings("unchecked")
    @Override
    public List<TagStatAggregated> getStatsWithSubcategoriesAggregated() {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT CASE WHEN LOCATE('_', t.name) > 1 THEN SUBSTRING(t.name,1,LOCATE('_', t.name) - 1) ELSE t.name END AS category");
        queryString.append(", COUNT(mt.meme_id) AS weight FROM tag t");
        queryString.append(" INNER JOIN meme_tag mt ON t.tag_id = mt.tag_id");
        queryString.append(" GROUP BY category");
        queryString.append(" ORDER BY category");
        String q = queryString.toString();
        Query query = em.createNativeQuery(queryString.toString(), "tagStatsAggregated");

        return (List<TagStatAggregated>) query.getResultList();
    }

    @SuppressWarnings("unchecked")
    @Override
    public List<Tag> getUnusedTags() {
        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT t.* FROM tag t");
        queryString.append(" WHERE NOT EXISTS (");
        queryString.append(" SELECT 1 FROM meme_tag mt");
        queryString.append(" WHERE mt.tag_id = t.tag_id");
        queryString.append(" )");
        String q = queryString.toString();
        Query query = em.createNativeQuery(queryString.toString(), Tag.class);

        return (List<Tag>) query.getResultList();
    }
}
