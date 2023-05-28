import { browser, promise } from "protractor";

// be careful if you use this method change organisation context, may get 'not authorised' depending on what you're doing
// https://github.com/angular/protractor/issues/3911
export class RouterUtil {
  public static navigateByUrl(url): promise.Promise<any> {
    return browser.executeScript((route) => window["protractorNavigateByUrl"](route), url);
  }
}
