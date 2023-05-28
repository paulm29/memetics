package au.com.memetics.dao;

import java.util.List;

import au.com.memetics.entity.Comment;
import au.com.memetics.entity.Comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentDao extends JpaRepository<Comment, Long>, CommentDaoCustom {
    List<Comment> findByProfileId(Long profileId);
    List<Comment> findByMemeId(Long memeId);
    long countByProfileId(Long profileId);
}
