package au.com.memetics.service;

import au.com.memetics.dao.CommentDao;
import au.com.memetics.entity.Comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CommentService {
    private final CommentDao dao;

    @Autowired
    public CommentService(final CommentDao commentDao) {
        this.dao = commentDao;
    }

    public List<Comment> getAll(final Long profileId) {
        if (Objects.isNull(profileId)) {
            return dao.findAll();
        }
        return dao.findByProfileId(profileId);
    }

    public Comment get(final long id) {
        return dao.get(id);
    }

    public List<Comment> getCommentsForMeme(long memeId) {
        return dao.findByMemeId(memeId);
    }

    public Comment create(final Comment comment) {
        return dao.save(comment);
    }

    public Comment update(final Comment comment) {
        return dao.save(comment);
    }

    public void delete(final Long id) {
        dao.delete(id);
    }

    long getCommentsCountForProfile(long profileId) {
        return dao.countByProfileId(profileId);
    }
}
