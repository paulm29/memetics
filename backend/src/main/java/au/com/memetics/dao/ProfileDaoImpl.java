package au.com.memetics.dao;

import au.com.memetics.entity.Profile;
import au.com.memetics.entity.ProfileSearchCriteria;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.apache.commons.lang3.StringUtils.isBlank;

@Repository
public class ProfileDaoImpl implements ProfileDaoCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    @Override
    public List<Profile> findBy(ProfileSearchCriteria criteria) {
        StringBuilder queryString = new StringBuilder();
        Map<String, Object> params = new HashMap<>();
        queryString.append("SELECT * FROM profile p WHERE 1=1 ");

        if (!isBlank(criteria.getEmail())) {
            queryString.append(" AND p.email = :email ");
            params.put("email", criteria.getEmail());
        }
        if (!isBlank(criteria.getNickname())) {
            queryString.append(" AND p.nickname = :nickname ");
            params.put("nickname", criteria.getNickname());
        }

        queryString.append(" ORDER BY trim(p.nickname) asc ");
        Query query = entityManager.createNativeQuery(queryString.toString(), Profile.class);
        params.forEach(query::setParameter);

        return (List<Profile>) query.getResultList();
    }

//    @Override
//    public Profile get(long profileId) {
//        Map<String, Object> params = new HashMap<>();
//        params.put("profileId", profileId);
//
//        // TODO!
//        Query query = entityManager.createQuery("SELECT p FROM Profile p WHERE p.id = :profileId", Profile.class);
//        params.forEach(query::setParameter);
//
//        List<Profile> results = query.getResultList();
//        if (results.isEmpty()) {
//            return null;
//        }
//        return results.get(0);
//    }

//    @Override
//    public void delete(long profileId) {
//        Map<String, Object> params = new HashMap<>();
//        params.put("profileId", profileId);
//
//        Query query = entityManager.createQuery("DELETE FROM Profile p WHERE p.id = :profileId");
//        params.forEach(query::setParameter);
//
//        query.executeUpdate();
//    }
}
