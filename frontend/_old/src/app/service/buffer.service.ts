import { Injectable } from "@angular/core";
import { MemeticsClient } from "./memetics.client";
import { ApplicationConfig } from "../model/application.config";
import { Idle } from "@ng-idle/core";
import { BufferUpdate } from "../model/buffer.update";
import { Observable } from "rxjs";
import { BufferRetweet } from "../model/buffer.retweet";

@Injectable()
export class BufferService {

  constructor(private  memeticsClient: MemeticsClient) {
  }

  retweet(bufferRetweet: BufferRetweet): Observable<BufferUpdate[]> {
    return this.memeticsClient.bufferRetweetCreate(bufferRetweet);
  }

  bufferUpdateCreate(bufferUpdate: BufferUpdate): Observable<BufferUpdate[]> {
    return this.memeticsClient.bufferUpdateCreate(bufferUpdate);
  }
}
