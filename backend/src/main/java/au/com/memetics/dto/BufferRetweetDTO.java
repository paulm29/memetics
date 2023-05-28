package au.com.memetics.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BufferRetweetDTO {
    String tweetId;
    String comment;
    boolean top;
}
