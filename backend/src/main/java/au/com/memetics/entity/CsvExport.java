package au.com.memetics.entity;

import au.com.memetics.dto.MemeExportDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
//@Schema(name = "CSV export")
public class CsvExport {
    private List<MemeExportDTO> exports;
    private String filename;
}
