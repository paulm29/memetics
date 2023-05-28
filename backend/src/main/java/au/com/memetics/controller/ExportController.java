package au.com.memetics.controller;


import au.com.memetics.dto.MemeExportDTO;
import au.com.memetics.entity.CsvExport;
import au.com.memetics.entity.Meme;
import au.com.memetics.entity.MemeSearchCriteria;
import au.com.memetics.mapping.MemeExportMapper;
import au.com.memetics.service.MemeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Tag(name = "export", description = "Operations with exports")
public class ExportController {
    private final MemeService service;

    public ExportController(final MemeService memeService) {
        this.service = memeService;
    }

    @GetMapping(path = "/meme-export", produces = "text/csv")
    @Operation(summary = "Export memes to CSV file.")
    public CsvExport export(@ModelAttribute MemeSearchCriteria criteria) {
        List<Meme> memes = service.find(criteria);
        List<MemeExportDTO> exports = MemeExportMapper.INSTANCE.toDtos(memes);

        CsvExport csvExport = new CsvExport();
        csvExport.setFilename("results.csv");
        csvExport.setExports(exports);

        return csvExport;
    }
}
