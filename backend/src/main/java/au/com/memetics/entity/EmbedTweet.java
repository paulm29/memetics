package au.com.memetics.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.social.twitter.api.OEmbedTweet;
import org.springframework.social.twitter.api.Tweet;

@Getter
@Setter
public class EmbedTweet {
    Tweet tweet;
    OEmbedTweet oembedTweet;
}
