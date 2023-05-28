package au.com.memetics.dto;

import au.com.memetics.entity.Follow;
import au.com.memetics.entity.HashtagFavourite;
import au.com.memetics.entity.Role;
import au.com.memetics.entity.SocialMediaSignin;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class ProfileDTO {
    private Long id;

    // email is username/userId
    public String getUsername() {
        return email;
    }

    private String email;
    private String nickname;
    private String country;
    private String firstName;
    private String lastName;
    private String city;
    private String state;
    private String webSite;
    private Date modifiedDate;
    private Date createdDate;

    private Set<Follow> following = new HashSet<>();
    private Set<Follow> followers = new HashSet<>();
    private Set<HashtagFavourite> hashtagFavourites = new HashSet<>();

    private Role role;
    private SocialMediaSignin socialMediaSignin;
    private long version;

    public boolean isTwitter() {
        return SocialMediaSignin.TWITTER.equals(socialMediaSignin);
    }
}
