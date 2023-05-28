package au.com.memetics.dao;

import au.com.memetics.entity.Meme;
import au.com.memetics.entity.MemeSearchCriteria;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.apache.commons.lang3.StringUtils.isBlank;


@Repository
@Slf4j
public class MemeDaoImpl implements MemeDaoCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unchecked")
    @Override
    public final Meme findRandom() {
        StringBuilder queryString = new StringBuilder("SELECT m.* FROM meme m WHERE 1=1");

        Map<String, Object> params = new HashMap<>();
        MemeSearchCriteria criteria = new MemeSearchCriteria();
        appendSoftDeleteCriteria(queryString, params, criteria);
        queryString.append(" ORDER BY RAND() LIMIT 1");

        Query query = entityManager.createNativeQuery(queryString.toString(), Meme.class);
        params.forEach(query::setParameter);

        return (Meme) query.getSingleResult();
    }

    @SuppressWarnings("unchecked")
    @Override
    public final List<Meme> findBy(final MemeSearchCriteria criteria) {
        Map<String, Object> params = new HashMap<>();
        StringBuilder queryString = new StringBuilder("SELECT m.* FROM meme m WHERE 1=1");
        appendCriteria(queryString, params, criteria);
        queryString.append(" ORDER BY trim(m.TITLE) asc");

        Query query = entityManager.createNativeQuery(queryString.toString(), Meme.class);
        query.setMaxResults(criteria.getMaxResults());
        params.forEach(query::setParameter);

        return (List<Meme>) query.getResultList();
    }

    @Override
    public long findByCount(MemeSearchCriteria criteria) {
        Map<String, Object> params = new HashMap<>();
        StringBuilder queryString = new StringBuilder("SELECT count(*) FROM meme m WHERE 1=1");
        appendCriteria(queryString, params, criteria);

        Query query = entityManager.createNativeQuery(queryString.toString());
        params.forEach(query::setParameter);

        return ((BigInteger) query.getSingleResult()).longValue();
    }

    private void appendCriteria(StringBuilder queryString, Map<String, Object> params, MemeSearchCriteria criteria) {
        appendSoftDeleteCriteria(queryString, params, criteria);
        appendMyMemesCriteria(queryString, params, criteria);
        appendNicknameCriteria(queryString, params, criteria);
        appendTitleCriteria(queryString, params, criteria);
        appendCreditCriteria(queryString, params, criteria);
        appendTagsCriteria(queryString, params, criteria);
    }

    private void appendSoftDeleteCriteria(StringBuilder queryString, Map<String, Object> params, MemeSearchCriteria criteria) {
        queryString.append(" AND m.is_active = :isActive");
        params.put("isActive", 1);
    }

    private void appendMyMemesCriteria(StringBuilder queryString, Map<String, Object> params, MemeSearchCriteria criteria) {
        if (criteria.isMyMemes()) {
            queryString.append(" AND m.profile_id = :profileId");
            params.put("profileId", criteria.getProfileId());
        }
    }

    private void appendNicknameCriteria(StringBuilder queryString, Map<String, Object> params, MemeSearchCriteria criteria) {
        if (!isBlank(criteria.getNickname())) {
            queryString.append(" AND m.profile_id IN (SELECT profile_id FROM profile p WHERE p.nickname = :nickname)");
            params.put("nickname", criteria.getNickname());
        }
    }

    private void appendTitleCriteria(StringBuilder queryString, Map<String, Object> params, MemeSearchCriteria criteria) {
        if (!isBlank(criteria.getTitle())) {
            queryString.append(" AND ").append(stringMatch("m.title", "title", criteria.isExactMatch()));
            params.put("title", criteria.getTitle());
        }
    }

    private void appendCreditCriteria(StringBuilder queryString, Map<String, Object> params, MemeSearchCriteria criteria) {
        if (!isBlank(criteria.getCredits())) {
            queryString.append(" AND ").append(stringMatch("m.credits", "credits", criteria.isExactMatch()));
            params.put("credits", criteria.getCredits());
        }
    }

    private void appendTagsCriteria(StringBuilder queryString, Map<String, Object> params, MemeSearchCriteria criteria) {
        if (!isBlank(criteria.getTags())) {
            queryString.append(" AND exists (SELECT * FROM meme_tag tm WHERE tm.meme_id = m.meme_id AND tm.tag_id IN ");
            queryString.append("( SELECT t.tag_id FROM tag t WHERE t.name IN :tagList ) )");
            params.put("tagList", criteria.getTagList());
        }
    }

    private String stringMatch(final String dbColumn, final String parameter, final boolean exactMatch) {
        if (exactMatch) {
            return "lower(" + dbColumn + ") = lower(:" + parameter + ") ";
        }
        return "lower(" + dbColumn + ") like concat('%', lower(:" + parameter + "), '%') ";
    }

    @SuppressWarnings("unchecked")
    public List<Meme> findLiked(final long profileId) {
        StringBuilder queryString = new StringBuilder();
        Map<String, Object> params = new HashMap<>();

        queryString.append("SELECT m FROM Meme m");
        queryString.append(" join m.votes v WHERE v.profileId = :profileId");
        params.put("profileId", profileId);
        queryString.append(" AND v.score = 1");

        Query query = entityManager.createQuery(queryString.toString(), Meme.class);
        params.forEach(query::setParameter);

        return (List<Meme>) query.getResultList();
    }

    @SuppressWarnings("unchecked")
    public List<Meme> findUnprocessed(final long profileId) {
        StringBuilder queryString = new StringBuilder();
        Map<String, Object> params = new HashMap<>();

        queryString.append("SELECT m FROM Meme m");
        queryString.append(" WHERE m.tags is empty AND m.profile.id = :profileId");
        params.put("profileId", profileId);

        Query query = entityManager.createQuery(queryString.toString(), Meme.class);
        params.forEach(query::setParameter);

        return (List<Meme>) query.getResultList();
    }

//    @PersistenceContext
//    private EntityManager em;
//    private QQualificationEnrolment qualificationEnrolment;
//
//    public List<QualificationEnrolment> findBy(String organisationId, QualificationEnrolmentSearchCriteria criteria) {
//        JPAQuery<QualificationEnrolment> query = new JPAQuery<>(em);
//        qualificationEnrolment = QQualificationEnrolment.qualificationEnrolment;
//        appendSoftDeleteCriteria(query.from(qualificationEnrolment));
//        appendOrganisationIdCriteria(query, organisationId);
//        appendCurrentEnrolmentsOnlyCriteria(query, criteria);
//        appendCurrentRegistrationsCriteria(query, criteria);
//        appendFilterQualificationCriteria(query, criteria);
//        appendILOCriteria(query, criteria);
//        appendIsOnlyFutureDeregsCriteria(query, criteria);
//        appendExitYearCriteria(query, criteria);
//        return query.fetch();
//    }
//
//    private void appendSoftDeleteCriteria(JPAQuery<QualificationEnrolment> query) {
//        query.innerJoin(QStudent.student)
//                .on(qualificationEnrolment.registration.studentId
//                        .eq(QStudent.student.id));
//        query.where(qualificationEnrolment.active.eq(true)
//                .and(qualificationEnrolment.registration.active.eq(true)
//                        .and(QStudent.student.active.eq(true)))
//        );
//    }
//
//    private void appendOrganisationIdCriteria(JPAQuery<QualificationEnrolment> query, String organisationId) {
//        if (!isEmpty(organisationId)) {
//            query.where(qualificationEnrolment.registration.organisationId
//                    .eq(organisationId));
//        }
//    }
//
//    private void appendCurrentEnrolmentsOnlyCriteria(JPAQuery<QualificationEnrolment> query, QualificationEnrolmentSearchCriteria criteria) {
//        if (isNull(criteria.getCurrentEnrolments())) {
//            return;
//        }
//        if (criteria.getCurrentEnrolments()) {
//            query.where(dateActive(qualificationEnrolment.ceaseDate));
//        } else {
//            query.where(dateExpired(qualificationEnrolment.ceaseDate));
//        }
//    }
//
//    private void appendCurrentRegistrationsCriteria(JPAQuery<QualificationEnrolment> query, QualificationEnrolmentSearchCriteria criteria) {
//        if (isNull(criteria.getCurrentRegistration())) {
//            return;
//        }
//        if (criteria.getCurrentRegistration()) {
//            query.where(dateActive(qualificationEnrolment.registration.ceaseDate));
//        } else {
//            query.where(dateExpired(qualificationEnrolment.registration.ceaseDate));
//        }
//    }
//
//    private void appendFilterQualificationCriteria(JPAQuery<QualificationEnrolment> query, QualificationEnrolmentSearchCriteria criteria) {
//        if (!isEmpty(criteria.getQualification())) {
//            query.where(qualificationEnrolment.qualificationCode
//                    .eq(criteria.getQualification()));
//        }
//    }
//
//    private void appendILOCriteria(JPAQuery<QualificationEnrolment> query, QualificationEnrolmentSearchCriteria criteria) {
//        if (isNull(criteria.getIntendedLearningOption())) {
//            return;
//        }
//        if (criteria.getIntendedLearningOption().equals("No ILO")) {
//            query.where(qualificationEnrolment.registration.intendedLearningOption.isNull());
//        } else {
//            query.where(qualificationEnrolment.registration.intendedLearningOption
//                    .eq(criteria.getIntendedLearningOption()));
//        }
//    }
//
//    private void appendIsOnlyFutureDeregsCriteria(JPAQuery<QualificationEnrolment> query, QualificationEnrolmentSearchCriteria criteria) {
//        if (criteria.isOnlyFutureDeregs()) {
//            query.where(dateFuture(qualificationEnrolment.registration.ceaseDate));
//        }
//    }
//
//    private void appendExitYearCriteria(JPAQuery<QualificationEnrolment> query, QualificationEnrolmentSearchCriteria criteria) {
//        if (nonNull(criteria.getExitYear())) {
//            query.where(qualificationEnrolment.registration.exitYear
//                    .eq(criteria.getExitYear()));
//        }
//    }

}
