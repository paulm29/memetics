package au.com.memetics.dao;

import au.com.memetics.entity.Meme;
import au.com.memetics.entity.Meme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemeDao extends JpaRepository<Meme, Long>, MemeDaoCustom {
    List<Meme> findByProfileId(long profileId);

    List<Meme> findByProfileEmail(String email);

    List<Meme> findByProfileNickname(String nickname);

    @Query("select title from Meme")
    List<String> getMemeTitles();

    long countByProfileId(long profileId);

    @Query("select url from Meme")
    List<String> getMemeUrls();
}
