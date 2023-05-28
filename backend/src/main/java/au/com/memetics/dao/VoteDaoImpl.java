package au.com.memetics.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

@Repository
@Slf4j
public class VoteDaoImpl implements VoteDaoCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Long getNumberOfLikesForAllMyMemes(Long profileId) {
        Map<String, Object> params = new HashMap<>();

        StringBuilder queryString = new StringBuilder();
        queryString.append("SELECT count(*) FROM vote v");
        queryString.append(" JOIN meme m ON v.meme_id = m.meme_id");
        queryString.append(" WHERE m.profile_id = :profileId");
        queryString.append(" AND v.score = 1");
        params.put("profileId", profileId.intValue());

        System.out.println(queryString.toString());

        Query query = entityManager.createNativeQuery(queryString.toString());
        params.forEach(query::setParameter);

        return ((BigInteger)query.getSingleResult()).longValue();
    }
}
