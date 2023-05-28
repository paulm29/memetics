package au.com.memetics.dao;

import au.com.memetics.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import au.com.memetics.entity.Schedule;


public interface ScheduleDao extends JpaRepository<Schedule, Long>, ScheduleDaoCustom {
//    @Query("from QueueItem qi where qi.profile.id = ?1")
//    List<QueueItem> findByProfileId(long profileId);
}
