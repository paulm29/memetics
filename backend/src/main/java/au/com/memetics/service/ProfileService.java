package au.com.memetics.service;

import au.com.memetics.dto.ProfileDTO;
import au.com.memetics.entity.Profile;
import au.com.memetics.entity.ProfileSearchCriteria;
import au.com.memetics.entity.ProfileStats;

import java.util.List;

public interface ProfileService {
    Profile get(long id);

    Profile getByEmail(String email);

    Profile getByNickname(String nickname);

    boolean emailCheck(String email);

    boolean nicknameCheck(String nickname);

    List<Profile> search(ProfileSearchCriteria criteria);

    ProfileStats getStats(long profileId);

    Profile create(Profile profile);

    Profile update(ProfileDTO profile);

    void delete(long id);

    Profile getProfileFromContext();
}
