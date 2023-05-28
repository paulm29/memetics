import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MemeticsClient } from "./memetics.client";
import { Post } from "../model/wordpress/post";
import { PostData } from "../model/wordpress/post-data";

@Injectable()
export class WordpressService {

  constructor(private memeticsClient: MemeticsClient) {
  }

  wordpressPostsCreate(post: PostData): Observable<Post> {
    return this.memeticsClient.wordpressPostCreate(post);
  }

  wordpressPostsGet(): Observable<Post[]> {
    return this.memeticsClient.wordpressPostsGet();
  }
}
