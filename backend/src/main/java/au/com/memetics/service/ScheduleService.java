package au.com.memetics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import au.com.memetics.dao.ScheduleDao;
import au.com.memetics.entity.QueueItem;
import au.com.memetics.entity.Schedule;

@Service
@Slf4j
public class ScheduleService {
    private final ScheduleDao dao;

    @Autowired
    public ScheduleService(final ScheduleDao scheduleDao) {
        this.dao = scheduleDao;
    }

    public List<Schedule> getAll() {
        return dao.findAll();
    }

    public Schedule get(final long id) {
        return dao.findById(id).orElse(null);
    }

    public Schedule findByProfileId(final Long profileId) {
        return dao.findByProfileId(profileId);
    }

    public Schedule create(Schedule schedule) {
        return dao.save(schedule);
    }

    public Schedule update(Schedule schedule) {
        return dao.save(schedule);
    }
}
