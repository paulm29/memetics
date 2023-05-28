import {Injectable} from "@angular/core";
import {MemeticsClient} from "./memetics.client";

@Injectable()
export class FileImportService {

  constructor(private memeticsClient: MemeticsClient) {
  }

  // getFileImportHistory(provider: Provider) {
  //   return this.easelClient.fileImportHistoryGet(provider);
  // }
}
