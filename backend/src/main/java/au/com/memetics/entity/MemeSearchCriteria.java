package au.com.memetics.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.apache.commons.lang3.StringUtils.isNotBlank;

@Getter
@Setter
@ToString
@Schema(name = "MemeSearchCriteria")
public class MemeSearchCriteria {
    @Schema(name = "Maximum results to return.  Defaults to 1000.")
    private Integer maxResults = 1000;

    @Schema(name = "Matches user's profile ID. Exact match only.")
    private boolean myMemes;

    @Schema(name = "Used with myMemes. Exact match only.")
    private long profileId;

    @Schema(name = "Matches profile nickname. Exact match only.")
    private String nickname;

    @Schema(name = "Matches title of meme. Case insensitive.")
    private String title;

    @Schema(name = "Matches credits for meme. Case insensitive.")
    private String credits;

    @Schema(name = "Comma separated list of tags. Matches memes with any of the tags.")
    private String tags;
    @Schema(name = "Only matches when provided criteria is an exact match. Case insensitive. Applies only to string fields.")
    private boolean exactMatch = false;

    @JsonIgnore
    @Hidden
    public List<String> getTagList() {
        List<String> tagList = new ArrayList<>();
        if (isNotBlank(tags)) {
            tagList = Arrays.asList(tags.split(","));
        }
        return tagList;
    }
}
