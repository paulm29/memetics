package au.com.memetics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import au.com.memetics.dao.VoteDao;
import au.com.memetics.entity.Vote;

@Slf4j
@Service
public class VoteService {
    private final VoteDao dao;

    @Autowired
    public VoteService(final VoteDao dao) {
        this.dao = dao;
    }

    public Vote get(final long id) {
        return dao.findById(id).orElse(null);
    }

    public List<Vote> getByMemeId(final long memeId) {
        return dao.findByMemeId(memeId);
    }

    public List<Vote> getByProfileId(final long profileId) {
        return dao.findByProfileId(profileId);
    }

    public Vote update(final Vote vote) {
        return dao.save(vote);
    }

    public Vote create(final Vote vote) {
        return dao.save(vote);
    }

    long getNumberOfMemesIveLiked(long profileId) {
        return dao.countByProfileId(profileId);
    }

    long getNumberOfLikesForAllMyMemes(long profileId) {
        return dao.getNumberOfLikesForAllMyMemes(profileId);
    }
}
