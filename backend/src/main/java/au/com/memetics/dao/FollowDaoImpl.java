package au.com.memetics.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class FollowDaoImpl implements FollowDaoCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void delete(long id) {
        Map<String, Object> params = new HashMap<>();
        params.put("followId", id);

        Query query = entityManager.createNativeQuery("DELETE FROM follow WHERE follow_id = :followId");
        params.forEach(query::setParameter);

        query.executeUpdate();
    }

    // Just keeping the below as a reminder of the pain of a previous issue.
    // I needed to use orphanRemoval = true and NO cascade, as the the parent wasn't the entity removing the HashtagFavourite





//    @Override
//    public void delete(long hashtagFavouriteId) {
//        Map<String, Object> params = new HashMap<>();
//        params.put("hashtagFavouriteId", hashtagFavouriteId);
//
//        Query query = entityManager.createNativeQuery("DELETE FROM hashtag_favourite WHERE hashtag_favourite_id = :hashtagFavouriteId");
//        params.forEach(query::setParameter);
//
//        query.executeUpdate();
//    }

//    @Override
//    public void delete(long hashtagFavouriteId) {
//        Map<String, Object> params = new HashMap<>();
//        params.put("hashtagFavouriteId", hashtagFavouriteId);
//
//        Query query = entityManager.createQuery("DELETE FROM HashtagFavourite hf WHERE hf.id = :hashtagFavouriteId");
//        params.forEach(query::setParameter);
//
//        query.executeUpdate();
//    }
}
