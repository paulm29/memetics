package au.com.memetics.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Schema(name = "TweetSearchCriteria")
public class TweetSearchCriteria {
    @Schema(name = "Minimum date/time of tweets to return")
    public String startDate;

    @Schema(name = "Maximum date/time of tweets to return")
    public String endDate;

    @Schema(name = "How many tweets to return.")
    public Integer count;

    public boolean notRetweeted;
}
