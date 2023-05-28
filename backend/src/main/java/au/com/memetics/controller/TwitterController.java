package au.com.memetics.controller;

import au.com.memetics.entity.DownloadStats;
import au.com.memetics.entity.MemeTweet;
import au.com.memetics.service.TweetDownloadService;
import au.com.memetics.service.TweetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.twitter.api.OEmbedTweet;
import org.springframework.social.twitter.api.Tweet;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@Slf4j
@Tag(name = "tweets", description = "Send and view tweets")
public final class TwitterController {
    private final TweetService tweetService;
    private final TweetDownloadService tweetDownloadService;

    @Autowired
    private TwitterController(final TweetService tweetService, TweetDownloadService tweetDownloadService) {
        this.tweetService = tweetService;
        this.tweetDownloadService = tweetDownloadService;
    }

    @GetMapping(path = "/tweets/hashtag/", produces = APPLICATION_JSON_VALUE)
    @Operation(summary = "Get tweets by hashtag")
    public List<Tweet> getHashtag(@PathVariable("hashtag") final String hashTag, @RequestParam("max") final int max) {
        Twitter twitter = tweetService.getCurrentUserConnection();
        return twitter.searchOperations().search(hashTag, max).getTweets();
    }

    @GetMapping(path = "/tweets/handle/", produces = APPLICATION_JSON_VALUE)
    @Operation(summary = "Get tweets on user's timeline")
    public List<Tweet> getTimeline(final @PathVariable("handle") String handle, @RequestParam("max") final int max) {
        Twitter twitter = tweetService.getCurrentUserConnection();
        return twitter.timelineOperations().getUserTimeline(handle, max);
    }

    @PostMapping(path = "/tweets/text", consumes = APPLICATION_JSON_VALUE)
    @ResponseStatus(CREATED)
    @Operation(summary = "Create a text-only tweet")
    public Tweet tweetText(final @RequestBody MemeTweet memeTweet) {
        Twitter twitter = tweetService.getCurrentUserConnection();
        return twitter.timelineOperations().updateStatus(memeTweet.getText());
    }

    @PostMapping(path = "/tweets/meme", consumes = APPLICATION_JSON_VALUE)
    @ResponseStatus(CREATED)
    @Operation(summary = "Create a tweet with text and an image")
    public Tweet tweetMeme(final @RequestBody MemeTweet memeTweet) throws MalformedURLException {
        return tweetService.tweetMeme(tweetService.getCurrentUserConnection(), memeTweet);
    }

    // ?profile={profile}&folder={folder}&pageSize={pageSize}&deleteTweet={deleteTweet}
    @GetMapping(path = "/tweets/liked", produces = APPLICATION_JSON_VALUE)
    @Operation(summary = "Download images from liked tweets for a particular user")
    public DownloadStats downloadLikedImages(@RequestParam("profile") final String profile, @RequestParam("folder") final String folder, @RequestParam("pageSize") final int pageSize, @RequestParam("deleteTweet") final boolean deleteTweet) {
        return tweetDownloadService.downloadLikedImages(tweetService.getCurrentUserConnection(), profile, folder, pageSize, deleteTweet);
    }

    @GetMapping(path = "/tweets/liked-delete", produces = APPLICATION_JSON_VALUE)
    @ResponseStatus(NO_CONTENT)
    @Operation(summary = "Delete images from liked tweets for a particular user")
    public void deleteLikedImages(@RequestParam("profile") final String profile, @RequestParam("pageSize") final int pageSize) {
        tweetDownloadService.deleteLikedImages(tweetService.getCurrentUserConnection(), profile, pageSize);
    }

    // TODO should really be in TwitterProfilesController and this should be called TweetsController. Also processing in some methods should be pushed to service level.
    @GetMapping(path = "/tweets/profile-name")
    @Operation(summary = "Get logged-in user's profile")
    public String getTwitterProfileName() {
        System.out.println(tweetService.getCurrentUserConnection().userOperations().getUserProfile().getScreenName()); // @name
        System.out.println(tweetService.getCurrentUserConnection().userOperations().getUserProfile().getName());       // display name
//        return "{\"twitterProfileName\": \"" + tweetService.getCurrentUserConnection().userOperations().getUserProfile().getScreenName() + "\"}";
        return tweetService.getCurrentUserConnection().userOperations().getUserProfile().getScreenName();
    }

    @GetMapping(path = "/tweets/{statusId}/replies", produces = APPLICATION_JSON_VALUE)
    @Operation(summary = "Get replies to a tweet")
    public Integer getTweetReplies(Long statusId) {
        return tweetService.getReplyCount(statusId);
    }

    @GetMapping(path = "/rest/oembed-tweet/{statusId}", produces = APPLICATION_JSON_VALUE)
    @Operation(summary = "Get replies to a tweet")
    public OEmbedTweet getTweetReplies(@PathVariable("statusId") String statusId) {
        return tweetService.getOembedTweet(statusId);
    }
}
