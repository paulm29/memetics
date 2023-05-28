package au.com.memetics.dao;

import java.util.List;

import au.com.memetics.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import au.com.memetics.entity.Follow;

@Repository
public interface FollowDao extends JpaRepository<Follow, Long>, FollowDaoCustom {
    List<Follow> findByFollowerId(long profileId);
    Long countFollowsByFollowerId(long profileId);

    List<Follow> findByFollowingId(long profileId);
    Long countFollowsByFollowingId(long profileId);

    void deleteByFollowerIdAndFollowingId(long followerId, long followingId);
}
