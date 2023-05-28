package au.com.memetics.dao;

import au.com.memetics.entity.Tag;
import au.com.memetics.entity.Tag;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TagDao extends JpaRepository<Tag, Long>, TagDaoCustom {
    Tag findByNameIgnoreCase(String tag);
}
