package au.com.memetics.dao;

import au.com.memetics.entity.QueueItem;
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
public class QueueDaoImpl implements QueueDaoCustom {
    @PersistenceContext
    private EntityManager em;

    @SuppressWarnings("unchecked")
    @Override
    public List<QueueItem> findByProfileId(long profileId) {
        StringBuilder queryString = new StringBuilder();
        Map<String, Object> params = new HashMap<>();

        queryString.append("SELECT q FROM QueueItem q");
        queryString.append(" join q.profile p WHERE p.id = :profileId");
        params.put("profileId", profileId);

        Query query = em.createQuery(queryString.toString(), QueueItem.class);
        params.forEach(query::setParameter);

        return (List<QueueItem>) query.getResultList();
    }
}
