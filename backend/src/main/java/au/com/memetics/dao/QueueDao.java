package au.com.memetics.dao;

import au.com.memetics.entity.QueueItem;
import org.springframework.data.jpa.repository.JpaRepository;


public interface QueueDao extends JpaRepository<QueueItem, Long>, QueueDaoCustom {
//    @Query("from QueueItem qi where qi.profile.id = ?1")
//    List<QueueItem> findByProfileId(long profileId);

//    @Query("from QueueItem qi where qi.id = ?1")
//    QueueItem get(long id);
//
//    @Modifying
//    @Transactional
//    @Query("delete from QueueItem qi where qi.id = ?1")
//    void delete(long id);
}
