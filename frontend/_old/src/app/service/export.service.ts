import { DateUtilService } from "./date.util.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ExportService {

  constructor(private dateUtilService: DateUtilService) {
  }


  exportAsCsv(input: string[], filename: string) {
    // Set file name/extension and start download
    const blob = new Blob(input, {type: "text/csv"});
    const link = document.createElement("a");
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
    }
  }

}
