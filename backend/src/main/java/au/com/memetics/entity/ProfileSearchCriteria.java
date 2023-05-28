package au.com.memetics.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(name = "ProfileSearchCriteria")
public class ProfileSearchCriteria {
    @Schema(title = "Matches profile nickname. Exact match only.")
    public String nickname;

    @Schema(title = "Matches profile email. Exact match only.")
    public String email;
}
