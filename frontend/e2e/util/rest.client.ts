import * as request from "request-promise";
import { browser } from "protractor";

class RestClient {
  restUrl;

  constructor() {
    this.restUrl = browser.params.restUrl;
  }

  get(url: string) {
    return request.get(this.restUrl + url);
  }

  delete(url: string) {
    return request.delete(this.restUrl + url);
  }

  getWithParams(url: string, params: any) {
    return request.get(this.restUrl + url, params);
  }

  putWithParams(url: string, params: any) {
    return request.put(this.restUrl + url, params);
  }

  calenderServiceGet(url: string) {
    return request.get(browser.params.calendarServiceUrl + url);
  }

  subjectServiceGet(url: string) {
    return request.get(browser.params.subjectServiceUrl + url);
  }

  syllabusServiceGet(url: string) {
    return request.get(browser.params.syllabusServiceUrl + url);
  }

  post(url: string, data: any) {
    const options = {
      uri: this.restUrl + url,
      method: "POST",
      json: data
    };
    return request(options);
  }

  put(url: string, data: any) {
    const options = {
      uri: this.restUrl + url,
      method: "PUT",
      json: data
    };
    return request(options);
  }
}

export let restClient = new RestClient();
