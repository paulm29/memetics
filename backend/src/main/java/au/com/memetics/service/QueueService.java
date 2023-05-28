package au.com.memetics.service;

import au.com.memetics.dao.QueueDao;
import au.com.memetics.entity.QueueItem;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class QueueService {
    private final QueueDao dao;

    @Autowired
    public QueueService(final QueueDao queueDao) {
        this.dao = queueDao;
    }

    public List<QueueItem> getQueueForProfile(Long profileId) {
        return dao.findByProfileId(profileId);
    }

    @Transactional
    public void deleteAllQueues() { // only used as a convenience for e2e testing
        dao.deleteAll();
    }

    @Transactional
    public QueueItem get(final Long id) {
        return dao.findById(id).orElse(null);
    }

    public QueueItem create(QueueItem queueItem) {
        return dao.save(queueItem);
    }

    @Transactional
    public QueueItem update(QueueItem queueItem) {
        return dao.save(queueItem);
    }

    @Transactional
    public void delete(Long queueItemId) {
        dao.deleteById(queueItemId);
    }
}
