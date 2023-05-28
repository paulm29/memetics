package au.com.memetics.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Schema(name = "MemeTweet")
public class MemeTweet {
    private Long memeId;
    private Long profileId;
    private String text;
    private String imageUrl;
    private boolean textOnly = false;
}
