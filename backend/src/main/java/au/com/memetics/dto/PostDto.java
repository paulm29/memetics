package au.com.memetics.dto;

import com.afrozaar.wordpress.wpapi.v2.model.Media;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private String title;
    private String excerpt;
    private String content;
    private Integer category;

    private Media media;
}
