package au.com.memetics.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Schema(name = "ReferenceDataItem")
public class ReferenceDataItem {
    private String code;
    private String description;
}
