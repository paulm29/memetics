package au.com.memetics.dao;

import java.util.List;

import au.com.memetics.entity.QueueItem;
import au.com.memetics.entity.QueueItem;

public interface QueueDaoCustom {
    List<QueueItem> findByProfileId(long profileId);
}
