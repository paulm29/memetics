import { Injectable } from "@angular/core";
import { MemeticsClient } from "./memetics.client";
import { ApplicationConfig } from "../model/application.config";
import { Idle } from "@ng-idle/core";

@Injectable()
export class ApplicationConfigService {
  config: ApplicationConfig;

  constructor(private  memeticsClient: MemeticsClient, private idle: Idle) {
  }

  getApplicationConfig(): void {
    if (this.config) {
      return;
    }

    this.memeticsClient.applicationConfigGet().subscribe((response) => {
      this.config = new ApplicationConfig();
      this.config.imgurClientId = response.imgurClientId;
      this.config.twitterConsumerKey = response.twitterConsumerKey;
      this.config.twitterConsumerSecret = response.twitterConsumerSecret;

      this.config.bearerToken = response.bearerToken;
      this.config.idle = response.idle;
      this.config.idleTimeout = response.idleTimeout;

      console.log("setting timeout", this.config.idle, this.config.idleTimeout);
      this.idle.setIdle(Number(this.config.idle));                // sets an idle timeout of 5 seconds, for testing purposes.
      this.idle.setTimeout(Number(this.config.idleTimeout));     // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    });
  }
}
