package au.com.memetics.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Setter
@Entity
@Table(name = "tweet_info")
@ToString
public class TweetInfo {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "tweet_info_id")
    private Long tweetInfoId;

    @Column(name = "profile_id")
    private long profileId;

    @Column(name = "meme_id")
    private long memeId;

    @Column(name = "status_id")
    private String statusId; // https://twitter.com/AussieMAGA/status/<id>

    @Column(name = "text")
    private String text;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "from_user")
    private String fromUser;

    @Column(name = "source")
    private String source; // web site from which the tweet was sent

    @Version
    private long version;
}
