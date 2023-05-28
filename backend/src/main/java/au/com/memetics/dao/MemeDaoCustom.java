package au.com.memetics.dao;

import au.com.memetics.entity.Meme;
import au.com.memetics.entity.MemeSearchCriteria;

import java.util.List;

public interface MemeDaoCustom {
    List<Meme> findBy(MemeSearchCriteria criteria);
    long findByCount(MemeSearchCriteria criteria);
    Meme findRandom();
    List<Meme> findLiked(long profileId);
    List<Meme> findUnprocessed(long profileId);
    /*
     only created because getting "Found two representations of same collection" with comments using dao.findOne()
     , and I have no idea why, despite googling and trying and changing a whole bunch of shit.
     Ridiculous that I had to do it, but sigh. It works
      */
//    Meme get(long memeId);
//    void delete(long memeId);
}
