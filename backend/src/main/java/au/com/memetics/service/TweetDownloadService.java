package au.com.memetics.service;

import au.com.memetics.entity.DownloadStats;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.twitter.api.MediaEntity;
import org.springframework.social.twitter.api.Tweet;
import org.springframework.social.twitter.api.Twitter;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.LongAdder;

@Slf4j
@Service
public class TweetDownloadService {

    private static final int DEFAULT_TWEET_LIMIT = 50;
    private static final int FILENAME_SEED = 10_000_000;

    @Autowired
    public TweetDownloadService() {
    }

    public void deleteLikedImages(final Twitter twitter, final String profile, final Integer pageSize) {
        List<Tweet> tweetList = twitter.timelineOperations().getFavorites(profile, pageSize);

        tweetList.forEach(tweet -> {
            twitter.timelineOperations().removeFromFavorites(Long.valueOf(tweet.getId()));
        });
    }

    public DownloadStats downloadLikedImages(final Twitter twitter, final String profile, final String folder, final Integer pageSize, final boolean deleteTweet) {
        String saveFolder;
        if (folder == null) saveFolder = "c://pol//";
        else {
            saveFolder = folder;
        }
        final String downloadFolder = saveFolder;

        int saveLimit;
        if (pageSize == null) {
            saveLimit = DEFAULT_TWEET_LIMIT;
        } else {
            saveLimit = pageSize;
        }
        log.info("Downloading " + saveLimit + " liked tweets to " + downloadFolder + " ...");

        List<Tweet> tweetList = twitter.timelineOperations().getFavorites(profile, saveLimit);
        log.info(tweetList.size() + " tweets received.");

        LongAdder imageCount = new LongAdder();
        tweetList.forEach(tweet -> {
            tweet.getEntities().getMedia().forEach(mediaEntity -> writeImage(downloadFolder, mediaEntity, imageCount));
            if (deleteTweet) {
                log.info("Deleting: " + tweet.getId());
                twitter.timelineOperations().removeFromFavorites(Long.parseLong(tweet.getId()));
            }
        });
        log.info(imageCount.toString() + " images downloaded.");

        int likedTweetsRemaining = twitter.userOperations().getUserProfile().getFavoritesCount();
        return new DownloadStats(pageSize, tweetList.size(), imageCount.intValue(), likedTweetsRemaining);
    }

    private void writeImage(String downloadFolder, MediaEntity mediaEntity, LongAdder imageCount) {
        String urlString = mediaEntity.getMediaUrl();
        URL url;
        try {
            url = new URL(urlString);
            BufferedImage img = ImageIO.read(url);
            String fileString = downloadFolder + randomString() + ".jpg";
            File file = new File(fileString);
            ImageIO.write(img, "jpg", file);
            imageCount.increment();

            log.info("Saved " + fileString + " from " + urlString + " Type: " + mediaEntity.getType());
        } catch (IllegalArgumentException | MalformedURLException e) {
            log.error("Error accessing URL", e);
            String advice = "Looks like this image is corrupt and can't be downloaded automatically: " + mediaEntity.getUrl();
            throw new UploadException(e, advice);
        } catch (IOException e) {
            log.error("Error reading image", e);
            String advice = "Looks like this image is corrupt and can't be downloaded automatically: " + mediaEntity.getUrl();
            throw new UploadException(e, advice);
        }
    }

    // https://stackoverflow.com/questions/28318604/imageio-read-failing-with-no-exception-and-a-vaild-url
//    private void writeImage2(String downloadFolder, MediaEntity mediaEntity, LongAdder imageCount) {
//        String urlString = mediaEntity.getMediaUrl();
//
//        try (CloseableHttpClient httpclient = HttpClients.createDefault()) {
//            HttpGet httpget = new HttpGet(urlString);
//            try (CloseableHttpResponse response = httpclient.execute(httpget);
//                 InputStream stream = response.getEntity().getContent()) {
//
//                String fileString = downloadFolder + randomString() + ".jpg";
//                readAndWriteImage(stream, fileString);
//
//                imageCount.increment();
//
//                log.info("Saved " + fileString + " from " + urlString + " Type: " + mediaEntity.getType());
//            }
//        } catch (IllegalArgumentException | MalformedURLException e) {
//            log.error("Error accessing URL", e);
//            String advice = "Looks like this image is corrupt and can't be downloaded automatically: " + mediaEntity.getUrl();
//            throw new UploadException(e, advice);
//        } catch (IOException e) {
//            log.error("Error reading image", e);
//            String advice = "Looks like this image is corrupt and can't be downloaded automatically: " + mediaEntity.getUrl();
//            throw new UploadException(e, advice);
//        }
//    }

    public void readAndWriteImage(InputStream stream, String fileString) throws IOException {
        ImageIO.setUseCache(false);

        BufferedImage sourceImg = ImageIO.read(stream);

        File file = new File(fileString);
        ImageIO.write(sourceImg, "jpg", file);
    }

    private String randomString() {
        Random rand = new Random();
        int n = rand.nextInt(FILENAME_SEED) + 1;
        return Integer.toString(n);
    }
}
