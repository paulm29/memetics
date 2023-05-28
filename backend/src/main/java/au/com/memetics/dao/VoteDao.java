package au.com.memetics.dao;

import java.util.List;

import au.com.memetics.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import au.com.memetics.entity.Vote;

@Repository
public interface VoteDao extends JpaRepository<Vote, Long>, VoteDaoCustom {
    List<Vote> findByMemeId(long memeId);
    List<Vote> findByProfileId(long profileId);

    @Query("SELECT COUNT(v) FROM Vote v WHERE v.score=1 AND v.profileId=?1")
    Long countByProfileId(Long profileId);
}
