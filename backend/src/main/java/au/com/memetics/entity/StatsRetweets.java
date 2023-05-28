package au.com.memetics.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.social.twitter.api.OEmbedTweet;
import org.springframework.social.twitter.api.Tweet;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.toList;

@Getter
@Setter
public class StatsRetweets {
    List<Tweet> tweets = new ArrayList<>();
    List<EmbedTweet> embedTweets = new ArrayList<>();

    // must be public for serialisation
    public List<Tweet> getMostPopularList() {
        return tweets.stream().sorted(comparing(Tweet::getRetweetCount).thenComparing(Tweet::getFavoriteCount).reversed()).collect(toList());
    }
}
