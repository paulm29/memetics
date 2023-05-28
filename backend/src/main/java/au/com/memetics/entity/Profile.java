package au.com.memetics.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.social.security.SocialUser;

import java.util.*;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.EAGER;
import static jakarta.persistence.GenerationType.IDENTITY;
import static jakarta.persistence.TemporalType.TIMESTAMP;
import static java.util.Collections.singletonList;

@Getter
@Setter
@ToString
@Entity
@Table(name = "profile")
@Schema(name = "Profile")
public class Profile extends SocialUser {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "profile_id")
    @Schema(readOnly = true)
    private Long id;
    @NotNull
    @Column(name = "email", length = 50, nullable = false, unique = true)
    @Schema(required = true)
    private String email;
    @JsonIgnore
    @Column(name = "password", length = 100)
    private String password;
    @NotNull
    @Column(name = "nickname", length = 30, nullable = false)
    private String nickname;
    @NotNull
    @Column(name = "country", length = 30, nullable = false)
    private String country;
    @Column(name = "first_name", length = 30)
    private String firstName;
    @Column(name = "last_name", length = 30)
    private String lastName;
    @Column(name = "city", length = 30)
    private String city;
    @Column(name = "state", length = 30)
    private String state;
    @Column(name = "web_site", length = 50)
    private String webSite;
    @Column(name = "modified_date", nullable = false)
    @Temporal(TIMESTAMP)
    @Schema(title = "Date the profile was last modified")
    private Date modifiedDate;
    @NotNull
    @Column(name = "created_date", nullable = false)
    @Temporal(TIMESTAMP)
    @Schema(title = "Date the user signed up")
    private Date createdDate;
    @Enumerated(STRING)
    @Column(name = "role", length = 20, nullable = false)
    private Role role;
    @Enumerated(STRING)
    @Column(name = "sign_in_provider", length = 20)
    private SocialMediaSignin socialMediaSignin = SocialMediaSignin.NONE;
    @Version
    private long version;
    @OneToMany(mappedBy = "follower", fetch = EAGER, orphanRemoval = true)
    private Set<Follow> following = new HashSet<>();
    @OneToMany(mappedBy = "following", fetch = EAGER, orphanRemoval = true)
    private Set<Follow> followers = new HashSet<>();
    @OneToMany(mappedBy = "profile", fetch = EAGER, orphanRemoval = true)
    private Set<HashtagFavourite> hashtagFavourites = new HashSet<>();
    @Transient
    private List<String> permissions = new ArrayList<>(); // TODO use getAuthorities to develop permissions

    public Profile(final String username, final String password, final Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    // convenience constructor for Orika
    // tried using constructorA/B mapping, but it didn't handle mapping authorities and I couldn't be bothered to solve
    public Profile() {
        super("dummyUsername", "dummyPassword", new HashSet<>(singletonList(new SimpleGrantedAuthority(Role.ROLE_USER.toString()))));
    }

    @JsonIgnore
    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return super.getAuthorities();
    }

    @Transient // email is username/userId
    public String getUsername() {
        return email;
    }

    public boolean isTwitter() {
        return SocialMediaSignin.TWITTER.equals(socialMediaSignin);
    }

    @PrePersist
    public void prePersist() {
        Date now = new Date();
        this.createdDate = now;
        this.modifiedDate = now;
        this.role = Role.ROLE_USER;
    }

    @PreUpdate
    public void preUpdate() {
        this.modifiedDate = new Date();
    }
}
