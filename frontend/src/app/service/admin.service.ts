import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthClient } from "./auth.client";
import { Buffer } from 'buffer';
import { Observable } from "rxjs";
import { Profile } from "../model/profile";
import { ApplicationConfigService } from "./application-config.service";

@Injectable()
export class AdminService {

  constructor(private userService: UserService,
              private http: HttpClient,
              private authClient: AuthClient,
              private router: Router, private applicationConfigService: ApplicationConfigService) {
  }

  imagesBackup() {
    return this.http.get("rest/admins/backup");
  }

  // TODO https://angular.io/guide/http
  imgurCreditsGet(apiKey: string) {
    return this.http.get("https://api.imgur.com/3/credits", {
      headers: new HttpHeaders().set("Authorization", apiKey)
    });
  }

  // consumer key
  // consumer secret
  // token
  // token secret
  twitterRateLimitGet() {
    // console.log("twitterRateLimitGet", this.applicationConfigService);

    const authorisation = this.applicationConfigService.config.twitterConsumerKey + ":" + this.applicationConfigService.config.twitterConsumerSecret;
    // console.log("authorisation", authorisation);

    const authorisationHeader = "Basic " + new Buffer(authorisation).toString("base64");

    // let consumerKey = encodeURIComponent('<your consumer key>')
    // let consumerSecret = encodeURIComponent('<your consumer secret>')
    // let credentials = Base64.encode(consumerKey + ':' + consumerSecret)


    const authorisationHeaders = new HttpHeaders();
    authorisationHeaders.append("Authorization", authorisationHeader);

    authorisationHeaders.append("Access-Control-Allow-Origin", "*");
    // authorisationHeaders.append("Access-Control-Allow-Origin", "http://localhost:8080");

    authorisationHeaders.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    authorisationHeaders.append("Access-Control-Allow-Headers", "*");

    authorisationHeaders.append("Access-Control-Allow-Credentials", "Origin, Content-Type, X-Auth-Token");
    authorisationHeaders.append("Access-Control-Expose-Headers", "Authorization");
    // authorisationHeaders.append("HTTP/1.0", "200");
    authorisationHeaders.append("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

    let bearerToken: any;
    return this.http.post("http://localhost:80/api_twitter_com/oauth2/token", {"grant_type": "client_credentials"}, {headers: authorisationHeaders}); // https://api.twitter.com/oauth2/token

    // return this.http.post("https://api.twitter.com/oauth2/token", {"grant_type": "client_credentials"}, {headers: authorisationHeaders}).toPromise()
    //   .then((response) => {
    //     console.log("response", response);
    //     bearerToken = response["access_token"];
    //
    //     const apiHeaders = new HttpHeaders().set("Bearer", bearerToken);
    //
    //     return this.http.get("https://api.twitter.com/1.1/application/rate_limit_status.json", {headers: apiHeaders}).toPromise().then((response2) => {
    //       console.log("inner response", response2);
    //     }, (error2) => {
    //       console.log("error2", error2);
    //     });
    //   }, (error) => {
    //     console.log("error", error);
    //   });
  }
}
