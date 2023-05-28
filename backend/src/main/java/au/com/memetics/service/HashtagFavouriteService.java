package au.com.memetics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import au.com.memetics.dao.HashtagFavouriteDao;
import au.com.memetics.entity.HashtagFavourite;

@Service
public class HashtagFavouriteService {
    private HashtagFavouriteDao dao;

    @Autowired
    public HashtagFavouriteService(HashtagFavouriteDao dao) {
        this.dao = dao;
    }

    public HashtagFavourite createHashtagFavourite(HashtagFavourite hashtagFavourite) {
        return dao.save(hashtagFavourite);
    }

    public void deleteHashtagFavourite(long hashtagFavouriteId) {
        dao.deleteById(hashtagFavouriteId);
    }
}
