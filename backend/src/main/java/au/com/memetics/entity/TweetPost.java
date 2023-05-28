package au.com.memetics.entity;

import au.com.memetics.dto.PostDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TweetPost {
    private PostDto postData;
    private int publishCount;
    private TweetSearchCriteria criteria;
}
