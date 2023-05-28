package au.com.memetics.service;

import au.com.memetics.dao.TweetInfoDao;
import au.com.memetics.entity.MemeTweet;
import au.com.memetics.entity.TweetInfo;
import au.com.memetics.mapping.TweetInfoMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.social.RateLimitExceededException;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.twitter.api.*;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
public class TweetService {
    private final MemeService memeService;
    private final ConnectionRepository connectionRepository;
    private final UsersConnectionRepository userConnectionRepository;
    private TweetInfoDao tweetInfoDao;

    @Autowired
    public TweetService(final MemeService memeService, ConnectionRepository connectionRepository, UsersConnectionRepository userConnectionRepository, TweetInfoDao tweetInfoDao) {
        this.memeService = memeService;
        this.userConnectionRepository = userConnectionRepository;
        this.tweetInfoDao = tweetInfoDao;
        this.connectionRepository = connectionRepository;
    }

    public Twitter getCurrentUserConnection() {
        Connection<Twitter> connection = connectionRepository.findPrimaryConnection(Twitter.class);
        if (connection != null) {
            return connection.getApi();
        } else {
            return null;
        }
    }

    public Twitter getConnectionForProfileUsername(String username) {
        ConnectionRepository connRepo = userConnectionRepository.createConnectionRepository(username);
        return connRepo.getPrimaryConnection(Twitter.class).getApi();
    }

    public Tweet tweetMeme(final Twitter twitter, final MemeTweet memeTweet) {
        Resource imageUrlResource;
        try {
            imageUrlResource = new UrlResource(memeTweet.getImageUrl());
        } catch (MalformedURLException e) {
            throw new TweetException(e);
        }
        TweetData tweetData = new TweetData(memeTweet.getText());
        tweetData.withMedia(imageUrlResource);
        Tweet tweet = twitter.timelineOperations().updateStatus(tweetData);

        memeService.incrementUsage(memeTweet.getMemeId());
        saveTweet(tweet, memeTweet.getProfileId(), memeTweet.getMemeId());

        return tweet;
    }

    private void saveTweet(Tweet tweet, long profileId, long memeId) {
        TweetInfo tweetInfo = TweetInfoMapper.INSTANCE.toEntity(tweet);
        tweetInfo.setProfileId(profileId);
        tweetInfo.setMemeId(memeId);
        tweetInfoDao.save(tweetInfo);
    }

    public int getReplyCount(Long statusId) {
        Twitter twitter = getCurrentUserConnection();
        TimelineOperations timelineOperations = twitter.timelineOperations();
        Tweet tweet = timelineOperations.getStatus(statusId);

        List<Tweet> Mentions = timelineOperations.getMentions();

        int count = 0;

        try {
            for (Tweet Mention : Mentions) {
                if (Objects.equals(tweet.getId(), Mention.getInReplyToStatusId().toString())) {
                    count = count + 1;
                }
            }
        } catch (RateLimitExceededException e) {
            log.warn("Rate limited exceeded", e);
        }
        return count;
    }

    public OEmbedTweet getOembedTweet(String statusId) {
        Twitter twitter = getCurrentUserConnection();
        return twitter.timelineOperations().getStatusOEmbed(statusId);
    }
}
