package au.com.memetics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;

import au.com.memetics.dao.FollowDao;
import au.com.memetics.entity.Follow;
import au.com.memetics.entity.Profile;

@Service
@Slf4j
public class FollowService {
    private final FollowDao dao;

    @Autowired
    public FollowService(final FollowDao dao) {
        this.dao = dao;
    }

    public List<Follow> getAll() {
        return dao.findAll();
    }

    public Follow get(final long id) {
        return dao.findById(id).orElse(null);
    }

    public Follow create(final Follow follow) {
        return dao.save(follow);
    }

    public void update(final Follow follow) {
        dao.save(follow);
    }

    @Transactional
    public void delete(final long id) {
        Follow follow = get(id);
        dao.deleteByFollowerIdAndFollowingId(follow.getFollower().getId(), follow.getFollowing().getId());
    }

    long getFollowersCountForProfile(long profileId) {
       return dao.countFollowsByFollowingId(profileId);
    }

    long getFollowingCountForProfile(long profileId) {
        return dao.countFollowsByFollowerId(profileId);
    }
}
