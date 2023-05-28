package au.com.memetics.service;

import au.com.memetics.dao.TweetInfoDao;
import au.com.memetics.dto.PostDto;
import au.com.memetics.entity.*;
import com.afrozaar.wordpress.wpapi.v2.model.Post;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.RateLimitExceededException;
import org.springframework.social.ResourceNotFoundException;
import org.springframework.social.twitter.api.OEmbedTweet;
import org.springframework.social.twitter.api.SearchResults;
import org.springframework.social.twitter.api.Tweet;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import static java.util.Objects.nonNull;
import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.StringUtils.isEmpty;


@Slf4j
@Service
public class StatsService {
    private final TweetService tweetService;
    private final TweetInfoDao tweetInfoDao;
    private final WordpressService wordpressService;

    @Autowired
    public StatsService(TweetService tweetService, TweetInfoDao tweetInfoDao, WordpressService wordpressService) {
        this.tweetService = tweetService;
        this.tweetInfoDao = tweetInfoDao;
        this.wordpressService = wordpressService;
    }

    public Long publishRetweets(TweetPost tweetPost) {
        StatsRetweets retweets = getRetweets(tweetPost.getCriteria());
        List<Tweet> topTenTweets = retweets.getMostPopularList().subList(0, tweetPost.getPublishCount() - 1);

        List<OEmbedTweet> oEmbedTweets = new ArrayList<>();
        StringBuilder content = new StringBuilder();
        topTenTweets.forEach((tweet) -> {
            try {
                OEmbedTweet oEmbedTweet = tweetService.getOembedTweet(tweet.getId());
                oEmbedTweets.add(oEmbedTweet);
                content.append(oEmbedTweet.getHtml());
            } catch (ResourceNotFoundException e) {
                log.error("Could not get oembed for: https://twitter.com/AupolNews/status/" + tweet.getId(), e);
            }
        });

        int startOfLink = oEmbedTweets.get(0).getHtml().indexOf("<a");
        String blockQuote = "<blockquote class=\"twitter-tweet\"><p lang=\"en\" dir=\"ltr\">";
        String excerpt = oEmbedTweets.get(0).getHtml().substring(blockQuote.length(), startOfLink);

        PostDto postDto = new PostDto();
        postDto.setTitle(tweetPost.getPostData().getTitle() + " - " + excerpt);
        postDto.setExcerpt(excerpt);
        postDto.setCategory(tweetPost.getPostData().getCategory());
        String strippedContent = content.toString().replaceAll("<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>", "");
        postDto.setContent(strippedContent);

//        if (!topTenTweets.get(0).getEntities().getMedia().isEmpty()) {
//            MediaEntity mediaEntity = topTenTweets.get(0).getEntities().getMedia().get(0);
//            Media media = wordpressService.mediaCreate(mediaEntity);
//            if (nonNull(media)) {
//                postDto.setMedia(media);
//            }
//        }

        Post post = wordpressService.postCreate(postDto);

        return post.getId();
    }


    public StatsRetweets getRetweets(TweetSearchCriteria criteria) {
        int count = 200;
        if (nonNull(criteria.count)) {
            count = criteria.count;
        }

        Twitter twitter = tweetService.getCurrentUserConnection();

        List<Tweet> tweets = twitter.timelineOperations().getRetweetsOfMe(1, 100);
        int retrieved = 100;
        while (retrieved < count) {
            long lastTweetId = Long.valueOf(tweets.get(tweets.size() - 1).getId());
            List<Tweet> moreTweets = twitter.timelineOperations().getRetweetsOfMe(1, 100, 0, lastTweetId);
            tweets.addAll(moreTweets);
            retrieved += 100;
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        if (!isEmpty(criteria.startDate)) {
            LocalDateTime startDate = LocalDateTime.parse(criteria.startDate, formatter);
            tweets = tweets.stream()
                    .filter(tweet -> getLocalDateTime(tweet.getCreatedAt()).equals(startDate) || getLocalDateTime(tweet.getCreatedAt()).isAfter(startDate))
                    .collect(toList());
        }
        if (!isEmpty(criteria.endDate)) {
            LocalDateTime endDate = LocalDateTime.parse(criteria.endDate, formatter);
            tweets = tweets.stream()
                    .filter(tweet -> getLocalDateTime(tweet.getCreatedAt()).equals(endDate) || getLocalDateTime(tweet.getCreatedAt()).isBefore(endDate))
                    .collect(toList());
        }

        if (criteria.notRetweeted) {
            tweets = tweets.stream()
                    .filter(tweet -> !tweet.isRetweeted())
                    .collect(toList());
        }

        StatsRetweets retweets = new StatsRetweets();
        retweets.setTweets(tweets);
        return retweets;
    }

    public StatsRetweets getRetweetsEmbed(String startDateString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startDate = LocalDateTime.parse(startDateString, formatter);

        Twitter twitter = tweetService.getCurrentUserConnection();
        List<Tweet> tweets = twitter.timelineOperations().getRetweetsOfMe(1, 100);

        if (nonNull(startDate)) {
            tweets = tweets.stream()
                    .filter(tweet -> getLocalDateTime(tweet.getCreatedAt()).equals(startDate) || getLocalDateTime(tweet.getCreatedAt()).isAfter(startDate))
                    .collect(toList());
        }

        List<Tweet> topTweets = getTopTweets(tweets);

        StatsRetweets retweets = new StatsRetweets();
        try {
            List<EmbedTweet> embedTweets = topTweets.stream().map(tweet -> {
                EmbedTweet embedTweet = new EmbedTweet();
                embedTweet.setTweet(tweet);
                embedTweet.setOembedTweet(twitter.timelineOperations().getStatusOEmbed(tweet.getId()));
                return embedTweet;
            }).collect(toList());

            retweets.setEmbedTweets(embedTweets);

        } catch (RateLimitExceededException rlee) {
            log.warn("Rate limited exceeded", rlee);
        }

        return retweets;
    }

    // Need to get only top X tweets to avoid rate limit being exceed within the hour, which I think is 100 API calls
    private List<Tweet> getTopTweets(List<Tweet> tweets) {
        final int TOP_LIMIT = 4; // TODO change to 20
        Comparator<Tweet> byFirst = Comparator.comparing(Tweet::getRetweetCount);
        Comparator<Tweet> bySecond = Comparator.comparing(Tweet::getFavoriteCount);
        return tweets.stream().sorted(byFirst.thenComparing(bySecond).reversed()).collect(toList()).subList(0, TOP_LIMIT - 1);
    }

    public StatsTweets getTweets(String startDateString, Integer maxRetweets, Integer maxLikes) {
        Integer maxReplies = 0;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startDate = LocalDateTime.parse(startDateString, formatter);

        Twitter twitter = tweetService.getCurrentUserConnection();

        List<Tweet> tweets = twitter.timelineOperations().getUserTimeline(100);

        if (nonNull(startDate)) {
            tweets = tweets.stream()
                    .filter(tweet -> getLocalDateTime(tweet.getCreatedAt()).equals(startDate) || getLocalDateTime(tweet.getCreatedAt()).isAfter(startDate))
                    .filter(tweet -> tweet.getRetweetCount() <= maxRetweets)
                    .filter(tweet -> tweet.getFavoriteCount() <= maxLikes)
                    .filter(tweet -> tweet.getRetweetCount() <= maxReplies)
                    .collect(toList());
        }

        if (maxRetweets == 0 && maxLikes == 0 && maxReplies == 0) {
            tweets = tweets.stream()
                    .filter(tweet -> {
                        SearchResults results = twitter.searchOperations().search(tweet.getText());
                        return results.getTweets().size() == 0;
                    })
                    .collect(toList());
        }

        StatsTweets statsTweets = new StatsTweets();
        statsTweets.setTweets(tweets);
        return statsTweets;
    }

    public List<TweetInfo> getTweetInfos(long profileId) {
        return tweetInfoDao.findByProfileId(profileId);
    }

    private LocalDateTime getLocalDateTime(Date date) {
        return new java.sql.Timestamp(date.getTime()).toLocalDateTime();
    }
}
