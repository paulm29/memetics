package au.com.memetics.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DownloadStats {
    int pageSize;
    int tweetsReceived;
    int imagesDownloaded;
    int tweetRemaining;
}
