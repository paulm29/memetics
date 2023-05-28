package au.com.memetics.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "hashtag_favourite")
//@Schema(name = "hashtag favourite")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class HashtagFavourite {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "hashtag_favourite_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    @JsonIgnoreProperties(value = {"hashtagFavourites", "followers", "following"})
    private Profile profile;

    @Column(name = "hashtag")
    private String hashtag;

    @Version
    private long version;
}
