package au.com.memetics.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@JsonPropertyOrder({
        "id",
        "createdDate",
        "nickname",
        "credits",
        "title",
        "caption",
        "url"
})
@Schema(name = "MemeExportDTO")
public class MemeExportDTO {
    private Long id;
    private String createdDate;
    private String nickname;
    private String credits;
    private String title;
    private String caption;
    private String url;
}
