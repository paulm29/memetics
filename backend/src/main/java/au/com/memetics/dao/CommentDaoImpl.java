package au.com.memetics.dao;

import au.com.memetics.entity.Comment;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Repository
@Slf4j
public class CommentDaoImpl implements CommentDaoCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Comment get(long commentId) {
        Map<String, Object> params = new HashMap<>();
        params.put("commentId", commentId);

        Query query = entityManager.createQuery("SELECT c FROM Comment c WHERE c.id = :commentId", Comment.class);
        params.forEach(query::setParameter);

        List<Comment> results = query.getResultList();
        if(results.isEmpty()) {
            return null;
        }
        return results.get(0);
    }

    @Override
    public void delete(long commentId) {
        Map<String, Object> params = new HashMap<>();
        params.put("commentId", commentId);

        Query query = entityManager.createQuery("DELETE FROM Comment c WHERE c.id = :commentId");
        params.forEach(query::setParameter);

        query.executeUpdate();
    }
}
