package au.com.memetics.dao;

import au.com.memetics.entity.Schedule;
import au.com.memetics.entity.Schedule;

public interface ScheduleDaoCustom {
    Schedule findByProfileId(long profileId);
}
