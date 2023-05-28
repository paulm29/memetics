package au.com.memetics.util;

import au.com.memetics.entity.Profile;
import au.com.memetics.entity.Profile;

public class ProfileMother {

    public static Profile withRequiredFields() {
        Profile profile = new Profile();
        profile.setNickname("nickname");
        profile.setEmail("email@host.com");
        profile.setCountry("country");
        return profile;
    }
}
