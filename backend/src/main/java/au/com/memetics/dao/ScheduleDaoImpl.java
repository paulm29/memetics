package au.com.memetics.dao;

import au.com.memetics.entity.Schedule;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class ScheduleDaoImpl implements ScheduleDaoCustom {
    @PersistenceContext
    private EntityManager em;

    @SuppressWarnings("unchecked")
    @Override
    public Schedule findByProfileId(long profileId) {
        StringBuilder queryString = new StringBuilder();
        Map<String, Object> params = new HashMap<>();

        queryString.append("SELECT s FROM Schedule s");
        queryString.append(" join s.profile p WHERE p.id = :profileId");
        params.put("profileId", profileId);

        Query query = em.createQuery(queryString.toString(), Schedule.class);
        params.forEach(query::setParameter);

        return (Schedule) query.getSingleResult();
    }
}
