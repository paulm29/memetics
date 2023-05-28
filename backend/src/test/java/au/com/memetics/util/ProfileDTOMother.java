package au.com.memetics.util;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;

import au.com.memetics.dto.ProfileDTO;
import au.com.memetics.entity.Follow;
import au.com.memetics.entity.HashtagFavourite;
import au.com.memetics.entity.Role;
import au.com.memetics.entity.SocialMediaSignin;
import au.com.memetics.dto.ProfileDTO;
import au.com.memetics.entity.Follow;
import au.com.memetics.entity.HashtagFavourite;
import au.com.memetics.entity.Role;
import au.com.memetics.entity.SocialMediaSignin;

public class ProfileDTOMother {

    public static ProfileDTO withRequiredFields() {
        ProfileDTO profile = new ProfileDTO();
        profile.setNickname("nickname");
        profile.setEmail("email@host.com");
        profile.setCountry("country");

        profile.setRole(Role.ROLE_USER);
        profile.setSocialMediaSignin(SocialMediaSignin.TWITTER);
//        private long version;

        profile.setCreatedDate(new Date());

        profile.getFollowing().addAll(getFollowing());
        profile.getFollowers().addAll(getFollowers());
        profile.getHashtagFavourites().addAll(getHashtagFavourites());

        return profile;
    }

    private static HashSet<Follow> getFollowing() {
        return new HashSet<>();
    }

    private static HashSet<Follow> getFollowers() {
        return new HashSet<>();
    }

    private static HashSet<HashtagFavourite> getHashtagFavourites() {
        return new HashSet<>();
    }
}
