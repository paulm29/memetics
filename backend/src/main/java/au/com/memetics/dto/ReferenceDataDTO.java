package au.com.memetics.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReferenceDataDTO {
    public List<ReferenceDataItemDto> wordpressCategories;
    public List<ReferenceDataItemDto> states;
    public List<ReferenceDataItemDto> countries;
}
