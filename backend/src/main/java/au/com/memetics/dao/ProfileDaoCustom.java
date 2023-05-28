package au.com.memetics.dao;

import java.util.List;

import au.com.memetics.entity.Profile;
import au.com.memetics.entity.ProfileSearchCriteria;
import au.com.memetics.entity.Profile;
import au.com.memetics.entity.ProfileSearchCriteria;


public interface ProfileDaoCustom {
    List<Profile> findBy(ProfileSearchCriteria criteria);
}
