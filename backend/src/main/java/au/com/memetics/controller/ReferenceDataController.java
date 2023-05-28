package au.com.memetics.controller;


import au.com.memetics.dto.ReferenceDataDTO;
import au.com.memetics.service.ReferenceDataService;
import au.com.memetics.service.WordpressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.util.concurrent.TimeUnit.HOURS;
import static org.springframework.http.CacheControl.maxAge;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/rest/reference-data", produces = APPLICATION_JSON_VALUE)
public class ReferenceDataController {
    private final ReferenceDataService service;
    private final WordpressService wordpressService;

    @Autowired
    public ReferenceDataController(ReferenceDataService service, WordpressService wordpressService) {
        this.service = service;
        this.wordpressService = wordpressService;
    }

    @GetMapping
    public ResponseEntity<ReferenceDataDTO> get() {
        ReferenceDataDTO referenceDataDTO = new ReferenceDataDTO();
        referenceDataDTO.setWordpressCategories(wordpressService.getCategories());
        return ResponseEntity.ok().cacheControl(maxAge(1, HOURS)).body(referenceDataDTO);
    }
}
