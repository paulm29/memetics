package au.com.memetics.dao;

import au.com.memetics.entity.HashtagFavourite;
import org.springframework.data.jpa.repository.JpaRepository;

import au.com.memetics.entity.HashtagFavourite;

public interface HashtagFavouriteDao extends JpaRepository<HashtagFavourite, Long>, HashtagFavouriteDaoCustom {
}
