package au.com.memetics.service;


import au.com.memetics.dto.ReferenceDataDTO;
import au.com.memetics.dto.ReferenceDataItemDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReferenceDataService {

    public ReferenceDataDTO get() {
        ReferenceDataDTO referenceData = new ReferenceDataDTO();

        List<ReferenceDataItemDto> states = new ArrayList<>();
        states.add(item("QLD", "Queensland"));
        states.add(item("NSW", "New South Wales"));
        states.add(item("VIC", "Victoria"));
        states.add(item("SA", "South Australia"));
        states.add(item("WA", "Western Australia"));
        states.add(item("NT", "Northern Territory"));
        states.add(item("ACT", "Australian Capital Territory"));
        states.add(item("TAS", "Tasmania"));
        referenceData.setStates(states);


        List<ReferenceDataItemDto> countries = new ArrayList<>();
        countries.add(item("AU", "Australia"));
        referenceData.setCountries(countries);


        return referenceData;
    }

    private ReferenceDataItemDto item(String code, String description) {
        return new ReferenceDataItemDto(code, description);
    }
}
