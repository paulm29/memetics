package au.com.memetics.dao;

import au.com.memetics.entity.TweetInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TweetInfoDao extends JpaRepository<TweetInfo, Long> {
    List<TweetInfo> findByProfileId(long profileId);
}
