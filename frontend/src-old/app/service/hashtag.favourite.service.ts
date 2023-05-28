import {Injectable} from "@angular/core";
import {MemeticsClient} from "./memetics.client";

@Injectable()
export class HashtagFavouriteService {

  constructor(private memeticsClient: MemeticsClient) {
}

    addFavouriteHashtag(profile, hashtag) {
        return this.memeticsClient.favouriteHashtagCreate(profile, hashtag);
    }

    removeFavouriteHashtag(profile, favouriteHashtagId) {
        return this.memeticsClient.favouriteHashtagDelete(profile, favouriteHashtagId);
    }
}
