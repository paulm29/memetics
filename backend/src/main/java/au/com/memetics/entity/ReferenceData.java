package au.com.memetics.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@Schema(name = "ReferenceData")
public class ReferenceData {
    private List<ReferenceDataItem> indigenousStatus;
    private List<ReferenceDataItem> countries;
    private List<ReferenceDataItem> birthCountries;
    private List<ReferenceDataItem> languages;
    private List<ReferenceDataItem> australianStates;
    private List<ReferenceDataItem> genders;
}
